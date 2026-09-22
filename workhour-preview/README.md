# Workhour Business design preview

Standalone Vercel-ready Next.js preview. It uses local typed content and runs without Payload, PostgreSQL, secrets or external services.

## Run in Windows PowerShell

```powershell
cd C:\Users\User\Desktop\client-assets\workhour-preview
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

## Vercel

Import the project with `workhour-preview` as the root directory. Framework preset: Next.js. Build command: `npm run build`. No environment variables are required. Deployment is intentionally not configured or performed.

This is a design preview. Forms are disabled, search is local-only, the logo is the supplied raster asset, and unresolved media uses abstract placeholders. Payload integration and subdomain routing remain outside this checkpoint.
