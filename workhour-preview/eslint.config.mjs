import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  { files: ['docs/**/*.cjs'], rules: { '@typescript-eslint/no-require-imports': 'off' } },
  { ignores: ['.next/**', 'node_modules/**'] },
]

export default eslintConfig
