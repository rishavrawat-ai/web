# Workhour Business frontend

Standalone Next.js frontend using local typed content. The main site and seven path-routed brand experiences include all requested main pages and 39 brand service detail pages. CMS, database, and R2 integrations are outside this frontend and remain paused.

## Run locally

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

## Deployment

The existing Vercel project is `workhour-preview`, linked to `rishavrawat-ai/web` with `workhour-preview` as its Root Directory. Git pushes to `main` trigger production deployments at https://workhour-preview.vercel.app. The frontend requires no environment variables.

## Content and factual boundaries

- The main Contact page includes the client's three required enquiry fields and local validation. No approved submission endpoint or recipient exists, so it does not send or store a message. The optional enquiry category stays hidden until the client supplies its options.
- Market groupings are qualified planning context, not confirmation of offices or local service availability.
- Employee Self Service Portal is described as a service concept; no employee portal or login is implemented.
- Announcement and media pages use only supplied titles and do not invent publication details, awards, credentials, or completed events.
- Generated scenes are illustrative and do not depict actual Workhour staff, offices, clients, or completed events.

Internal route, asset, copy-proposal, and factual-gap notes are in `docs/`.
