# Workhour Business foundation

This is the foundation for one shared Next.js App Router application serving the future Workhour Business site and seven true brand subdomains. Domain/DNS configuration and domain-based routing are intentionally not implemented at this checkpoint.

The app currently contains only:

- Payload CMS with its standard authenticated admin at `/admin`.
- An authenticated-only `Users` collection for admin users. There is no public registration and no hardcoded credential.
- A minimal public landing screen using the supplied Workhour Business logo and the exact phrase `Together We Thrive`.
- Tailwind CSS, TypeScript, and a local PostgreSQL Docker Compose service.

Client DOCX files and Reliance reference screenshots remain outside `public/` and are not exposed as public assets.

## Version requirements

- Node.js 20.9.0 or newer (Node 22.20.0 was available during setup).
- Next.js 16.3.3
- Payload 3.90.1
- React 19.2.6
- TypeScript 5.7.3
- Tailwind CSS 4.3.3 (installed; package range permits compatible 4.x updates)

## Windows PowerShell setup

From the repository root:

```powershell
Set-Location .\workhour-web
Copy-Item .env.example .env
notepad .env
```

In `.env`, replace `PAYLOAD_SECRET` with a long random value. Keep `.env` local; it is ignored by Git.

Start the local PostgreSQL service:

```powershell
docker compose up -d postgres
docker compose ps
```

Install dependencies and start the development server:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` for the landing screen and `http://localhost:3000/admin` for Payload Admin.

The PostgreSQL service uses host port `55432` because ports `5432` and `5433` were already occupied. The named Docker volume is `workhour-postgres-data`.

## First admin user

There is no seed credential. With the dev server running, open:

```text
http://localhost:3000/admin
```

Use the Create First User screen to enter the administrator email and a strong password. This creates the first authenticated user in Payload’s `users` collection. Subsequent users must be created through authenticated admin access; public registration is not enabled.

## Seed homepage CMS content

After creating an admin user, run the repeatable seed with that user’s credentials in the current PowerShell session:

```powershell
$env:SEED_ADMIN_EMAIL = 'admin@example.com'
$env:SEED_ADMIN_PASSWORD = 'use-the-admin-password'
npm run seed:homepage
```

The seed creates the seven businesses and the Homepage global as drafts. It creates only missing records, so rerunning it preserves existing edits. It does not create URLs, upload missing images, or publish unresolved content.

## Verification commands

```powershell
npm run lint
npm run build
```

If the local database is not running, Payload admin/build-time checks that need the database may fail. Start it first with `docker compose up -d postgres`.

## Not implemented yet

Full pages, content collections, forms, cross-brand search, newsletter delivery, domain routing, deployment/DNS, advanced editorial workflows, bookings, payments, employee portal and applicant tracking are intentionally out of scope for this foundation checkpoint.
