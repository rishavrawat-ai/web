import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sql, type MigrateUpArgs } from '@payloadcms/db-postgres'

type MigrationDB = MigrateUpArgs['db']
type SnapshotColumn = {
  name: string
  type: string
  notNull: boolean
  primaryKey?: boolean
  default?: string
}
type SnapshotIndex = {
  name: string
  columns: { expression: string; isExpression: boolean }[]
  isUnique: boolean
  method: string
}
type SnapshotForeignKey = {
  name: string
  tableFrom: string
  tableTo: string
  columnsFrom: string[]
  columnsTo: string[]
  onDelete: string
  onUpdate: string
}
type SnapshotTable = {
  name: string
  columns: Record<string, SnapshotColumn>
  indexes: Record<string, SnapshotIndex>
  foreignKeys: Record<string, SnapshotForeignKey>
}
type SchemaSnapshot = {
  tables: Record<string, SnapshotTable>
  enums: Record<string, { name: string; values: string[] }>
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const defaultSnapshot = '20260922_045859_homepage_content.json'

async function readSchemaSnapshot(filename = defaultSnapshot): Promise<SchemaSnapshot> {
  return JSON.parse(await readFile(path.join(dirname, '..', 'migrations', filename), 'utf8')) as SchemaSnapshot
}

function rows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[]
  if (result && typeof result === 'object' && 'rows' in result) {
    return (result as { rows: T[] }).rows
  }
  return []
}

function normalizeSQL(value: string): string {
  return value
    .replace(/"/g, '')
    .replace(/\bpublic\./gi, '')
    .replace(/\s+\(/g, '(')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

/** Return true only when public has no application tables and the baseline can be created. */
export async function isEmptyApplicationSchema(db: MigrationDB): Promise<boolean> {
  const expected = await readSchemaSnapshot()
  const tableNames = Object.values(expected.tables).map((table) => table.name)
  const found = rows<{ table_name: string }>(
    await db.execute(sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `),
  ).filter(({ table_name }) => tableNames.includes(table_name))
  if (found.length === 0) return true
  if (found.length !== tableNames.length) {
    throw new Error(
      `Payload baseline adoption stopped: found ${found.length} of ${tableNames.length} expected application tables. ` +
        'Do not run schema sync or mark migrations applied. Review the database schema before proceeding.',
    )
  }
  return false
}

/** Validate the complete current application schema before adopting a pre-migration database. */
export async function assertExistingSchema(
  db: MigrationDB,
  snapshotName: '20260922_045859_homepage_content.json' | '20261009_012208_pages_services.json' = defaultSnapshot,
): Promise<void> {
  const snapshot = await readSchemaSnapshot(snapshotName)
  const expected = snapshot.tables
  const problems: string[] = []
  const expectedTableNames = Object.values(expected).map((table) => table.name)

  const existingTables = rows<{ table_name: string }>(await db.execute(sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  `)).map(({ table_name }) => table_name).sort()
  const expectedTableSet = [...expectedTableNames].sort()
  for (const tableName of expectedTableSet) {
    if (!existingTables.includes(tableName)) problems.push(`table ${tableName} is missing`)
  }
  for (const tableName of existingTables) {
    if (!expectedTableSet.includes(tableName)) problems.push(`unexpected table ${tableName}`)
  }

  const columns = rows<{
    table_name: string
    column_name: string
    data_type: string
    udt_name: string
    is_nullable: string
    column_default: string | null
  }>(
    await db.execute(sql`
      SELECT table_name, column_name, data_type, udt_name, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `),
  ).filter(({ table_name }) => expectedTableNames.includes(table_name))
  const actualColumns = new Map<string, typeof columns>()
  for (const column of columns) {
    actualColumns.set(column.table_name, [...(actualColumns.get(column.table_name) ?? []), column])
  }

  for (const [qualifiedName, table] of Object.entries(expected)) {
    const actual = actualColumns.get(table.name) ?? []
    const actualByName = new Map(actual.map((column) => [column.column_name, column]))
    for (const expectedColumn of Object.values(table.columns)) {
      const column = actualByName.get(expectedColumn.name)
      if (!column) {
        problems.push(`${qualifiedName}.${expectedColumn.name} is missing`)
        continue
      }
      const actualTypeMap: Record<string, string> = {
        bool: 'boolean',
        int2: 'smallint',
        int4: 'integer',
        int8: 'bigint',
        timestamptz: 'timestamp with time zone',
        varchar: 'varchar',
      }
      const actualType = actualTypeMap[column.udt_name] ?? column.udt_name
      const expectedType = expectedColumn.type.startsWith('timestamp')
        ? 'timestamp with time zone'
        : expectedColumn.type === 'serial'
          ? 'integer'
          : expectedColumn.type
      if (actualType !== expectedType) {
        problems.push(`${qualifiedName}.${expectedColumn.name} type is ${actualType}, expected ${expectedType}`)
      }
      if ((column.is_nullable === 'NO') !== expectedColumn.notNull) {
        problems.push(`${qualifiedName}.${expectedColumn.name} nullability differs`)
      }
      if (expectedColumn.type === 'serial' && !column.column_default?.startsWith('nextval(')) {
        problems.push(`${qualifiedName}.${expectedColumn.name} is missing its generated primary-key sequence`)
      }
      if (expectedColumn.default !== undefined) {
        const normalizeDefault = (value: string | number) =>
          String(value)
            .replace(/::[\w ."]+/g, '')
            .replace(/[()\s]/g, '')
            .toLowerCase()
        if (
          column.column_default === null ||
          normalizeDefault(column.column_default) !== normalizeDefault(expectedColumn.default)
        ) {
          problems.push(`${qualifiedName}.${expectedColumn.name} default differs`)
        }
      }
    }
    for (const column of actual) {
      if (!table.columns[column.column_name]) problems.push(`${qualifiedName}.${column.column_name} is unexpected`)
    }
  }

  const primaryKeys = rows<{ table_name: string; column_name: string }>(
    await db.execute(sql`
      SELECT c.relname AS table_name, a.attname AS column_name
      FROM pg_constraint p
      JOIN pg_class c ON c.oid = p.conrelid
      JOIN pg_namespace n ON n.oid = c.relnamespace
      JOIN unnest(p.conkey) WITH ORDINALITY AS key_column(attnum, ordinality) ON true
      JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = key_column.attnum
      WHERE p.contype = 'p' AND n.nspname = 'public'
      ORDER BY c.relname, key_column.ordinality
    `),
  )
  const actualPrimaryKeys = new Map<string, string[]>()
  for (const { table_name, column_name } of primaryKeys) {
    actualPrimaryKeys.set(table_name, [...(actualPrimaryKeys.get(table_name) ?? []), column_name])
  }
  for (const table of Object.values(expected)) {
    const expectedColumns = Object.values(table.columns)
      .filter(({ primaryKey }) => primaryKey)
      .map(({ name }) => name)
    if (expectedColumns.join('\0') !== (actualPrimaryKeys.get(table.name) ?? []).join('\0')) {
      problems.push(`primary key on ${table.name} differs`)
    }
  }

  const indexes = rows<{ indexname: string; indexdef: string }>(
    await db.execute(sql`SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public'`),
  )
  const actualIndexes = new Map(indexes.map(({ indexname, indexdef }) => [indexname, indexdef]))
  const expectedIndexNames = Object.values(expected).flatMap((table) => [
    ...Object.keys(table.indexes),
    ...(Object.values(table.columns).some(({ primaryKey }) => primaryKey) ? [`${table.name}_pkey`] : []),
  ])
  for (const indexName of expectedIndexNames) {
    if (!actualIndexes.has(indexName)) problems.push(`index ${indexName} is missing`)
  }
  for (const indexName of actualIndexes.keys()) {
    if (!expectedIndexNames.includes(indexName)) problems.push(`unexpected index ${indexName}`)
  }
  for (const table of Object.values(expected)) {
    for (const index of Object.values(table.indexes)) {
      const definition = actualIndexes.get(index.name)
      if (!definition) {
        problems.push(`index ${index.name} is missing`)
        continue
      }
      const indexedColumns = index.columns.map(({ expression }) => expression).join(', ')
      const unique = definition.toUpperCase().includes('CREATE UNIQUE INDEX')
      const method = definition.match(/USING\s+(\w+)/i)?.[1]?.toLowerCase()
      if (
        unique !== index.isUnique ||
        method !== index.method ||
        !normalizeSQL(definition).includes(normalizeSQL(`(${indexedColumns})`))
      ) {
        problems.push(`index ${index.name} definition differs`)
      }
    }
  }

  const foreignKeys = rows<{ conname: string; definition: string }>(
    await db.execute(sql`
      SELECT conname, pg_get_constraintdef(oid) AS definition FROM pg_constraint
      WHERE contype = 'f' AND connamespace = 'public'::regnamespace
    `),
  )
  const actualForeignKeys = new Map(foreignKeys.map(({ conname, definition }) => [conname, definition]))
  const expectedForeignKeyNames = Object.values(expected).flatMap((table) => Object.keys(table.foreignKeys))
  for (const foreignKeyName of expectedForeignKeyNames) {
    if (!actualForeignKeys.has(foreignKeyName)) problems.push(`foreign key ${foreignKeyName} is missing`)
  }
  for (const foreignKeyName of actualForeignKeys.keys()) {
    if (!expectedForeignKeyNames.includes(foreignKeyName)) problems.push(`unexpected foreign key ${foreignKeyName}`)
  }
  for (const table of Object.values(expected)) {
    for (const foreignKey of Object.values(table.foreignKeys)) {
      const definition = actualForeignKeys.get(foreignKey.name)
      if (!definition) {
        problems.push(`foreign key ${foreignKey.name} is missing`)
        continue
      }
      const expectedFrom = `FOREIGN KEY (${foreignKey.columnsFrom.join(', ')}) REFERENCES ${foreignKey.tableTo}(${foreignKey.columnsTo.join(', ')})`
      const onDelete = foreignKey.onDelete.toUpperCase()
      const onUpdate = foreignKey.onUpdate.toUpperCase()
      const normalized = normalizeSQL(definition)
      if (
        !normalized.includes(normalizeSQL(expectedFrom)) ||
        (onDelete !== 'NO ACTION' && !normalized.includes(`ON DELETE ${onDelete}`)) ||
        (onUpdate !== 'NO ACTION' && !normalized.includes(`ON UPDATE ${onUpdate}`))
      ) {
        problems.push(`foreign key ${foreignKey.name} definition differs`)
      }
    }
  }

  const enumRows = rows<{ type_name: string; enum_value: string }>(
    await db.execute(sql`
      SELECT t.typname AS type_name, e.enumlabel AS enum_value
      FROM pg_type t
      JOIN pg_enum e ON e.enumtypid = t.oid
      JOIN pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      ORDER BY t.typname, e.enumsortorder
    `),
  )
  const actualEnums = new Map<string, string[]>()
  for (const row of enumRows) {
    actualEnums.set(row.type_name, [...(actualEnums.get(row.type_name) ?? []), row.enum_value])
  }
  for (const expectedEnum of Object.values(snapshot.enums)) {
    const values = actualEnums.get(expectedEnum.name)
    if (!values || values.join('\0') !== expectedEnum.values.join('\0')) {
      problems.push(`enum ${expectedEnum.name} values differ`)
    }
  }
  const expectedEnumNames = Object.values(snapshot.enums).map(({ name }) => name)
  for (const enumName of actualEnums.keys()) {
    if (!expectedEnumNames.includes(enumName)) problems.push(`unexpected enum ${enumName}`)
  }

  if (problems.length) {
    throw new Error(
      `Payload baseline adoption stopped because the existing schema does not match the checked-in final schema snapshot:\n- ${problems.join('\n- ')}`,
    )
  }
}
