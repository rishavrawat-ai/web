# Database migrations

## Fresh database

Set `DATABASE_URL` in the current PowerShell session to the new database and run the checked-in Payload migrations with development schema push disabled:

```powershell
$env:NODE_ENV = 'production'
$env:DATABASE_URL = 'postgres://USER:PASSWORD@HOST:PORT/NEW_DATABASE'
npm run payload -- migrate
npm run payload -- migrate:status
npm run payload -- migrate
```

The first migration creates Payload's core tables on an empty application schema. The existing homepage-content migration then creates the site collections and globals. `migrate:status` should show both as run, and the final migrate run should finish without any `Migrating:` entries. Do not use Payload development schema sync (`push`) as a fresh-install process.

## Existing development database adoption

For a database whose schema was previously pushed by Payload dev mode and already contains Pages and Services, first back it up and make a disposable clone. The checked-in `db:adopt-dev-pushed-schema` command takes an explicit database name and refuses the database named in `.env`. It compares the entire schema against `20261009_012208_pages_services.json` (tables, columns, types, defaults, nullability, indexes, foreign keys, and enums) before recording the pre-existing core baseline and Pages/Services migration. It also changes the dev marker's batch from Payload's special `-1` sentinel to `0`, so the normal migration runner does not show its dev-schema prompt. It does not change content records.

```powershell
npm run db:adopt-dev-pushed-schema -- workhour_dev_clone
$env:DATABASE_URL = 'postgres://USER:PASSWORD@HOST:PORT/workhour_dev_clone'
$env:NODE_ENV = 'production'
npm run payload -- migrate
npm run payload -- migrate:status
npm run payload -- migrate
```

The final migration runs apply only migrations newer than the adopted Pages/Services schema. Run the adoption command only when the exact snapshot comparison passes. If schema or history differs, it stops without recording adoption markers; investigate the database before continuing. Never use development schema push as the fresh-install or production migration workflow.

The baseline was generated with the installed Payload Postgres adapter migration API from the configured Payload version and a minimal Users config. Its SQL creates Payload's core tables for a fresh installation. The adoption command separately handles development databases whose current schema already includes the later site tables.
