# Brand sites

## Host mapping

Brand selection is an exact hostname lookup. Configure it at runtime with comma-separated `hostname=business-slug` entries. The local default explicitly maps all seven brand names:

```text
BRAND_HOSTS=inceptura.localhost=inceptura,employaa.localhost=employaa,remunerax.localhost=remunerax,gotravelglobal.localhost=gotravelglobal,elevatrain.localhost=elevatrain,thinkrunspace.localhost=thinkrunspace,leaderspinnacle.localhost=leaderspinnacle
```

Ports are ignored; parent/sibling subdomains are not inferred. Unknown hosts do not select any brand. The Payload admin stays on the main site host. API requests, Next static assets, and files are not rewritten by the brand host proxy. Internal brand route paths require a server HMAC signature and cannot be selected with client-supplied brand headers.

## Brand content

`Brand Pages` is an independent draft-enabled collection. Every record belongs to one Businesses record; a database unique index scopes slugs to that owner. `Pages` and `Services` continue to represent main-site content. A brand route requires both a resolved hostname and a published page belonging to that resolved business. Published changes are server-rendered dynamically and require no rebuild.

To seed the supplied Employaa copy, first apply migrations and ensure the existing Employaa Businesses record exists, then run:

```powershell
npm run import:employaa-brand
```

The importer creates missing records as drafts. It skips existing slugs for that brand without changing their content or publication status. Service titles are supplied; descriptions and brand-specific office locations remain empty until the client supplies them.

Brand colours are configurable on the Businesses record (`brandPrimaryColor`, `brandAccentColor`, and `brandBackgroundColor`). The brand logo uses its published Businesses logo; otherwise the shared header and footer display the text brand name. `brandSiteUrl` on Businesses controls the optional destination link on the main `/businesses/{slug}` introduction; leave it blank until a destination is confirmed.

The six remaining brand sites reuse the same Brand Pages collection and layout. Import missing records as drafts, without overwriting or publishing existing records, with:

```powershell
$env:BRAND_IMPORT_DATABASE_URL = 'postgres://USER:PASSWORD@HOST:PORT/WORKHOUR_DATABASE'
npm run import:brand-sites
Remove-Item Env:BRAND_IMPORT_DATABASE_URL
```

The command requires `BRAND_IMPORT_DATABASE_URL` explicitly and rejects it if it resolves to the database in `.env` `DATABASE_URL`. It targets only the explicitly selected database.

The importer reads the existing Business record's supplied homepage and detailed introductions. The About page keeps the detailed copy in paragraphs. Contact pages, the requested brand-specific Global Reach pages, and service detail pages remain honest empty states wherever the client has not supplied contact/location details or per-service descriptions. Service headings and brand-specific menu labels come from the reviewed source list. Remunerax's Employee Self Service Portal is a service listing only; it does not implement a portal.

The service menu labels are Offerings for Inceptura and ThinkRunSpace, Trainings for Elevatrain, and Services for Remunerax, Go Travel Global, Leaders Pinnacle, and Employaa. The main `/businesses/{slug}` pages remain the main-site introductions; their optional brand-site links are still controlled independently by `brandSiteUrl`.

Local test hosts are `inceptura.localhost`, `employaa.localhost`, `remunerax.localhost`, `gotravelglobal.localhost`, `elevatrain.localhost`, `thinkrunspace.localhost`, and `leaderspinnacle.localhost` (use the Next dev server's port, normally `3000`). Production hostnames still need explicit deployment configuration; no DNS is created here.

Integration tests require `TEST_DATABASE_URL` to be set explicitly in the test process. It must point to a separate PostgreSQL database whose name identifies it as a test, disposable database, or clone. The test harness rejects a URL resolving to the configured `DATABASE_URL` database before importing Payload config. Example:

```powershell
$env:TEST_DATABASE_URL = 'postgres://USER:PASSWORD@127.0.0.1:55432/workhour_brand_test_clone'
npm run test:int
Remove-Item Env:TEST_DATABASE_URL
```

## Migrations

Fresh installations run the checked-in chain in order, including `20261009_042723_brand_site_foundation`. Existing dev-pushed databases that already contain the Pages/Services schema require an explicit adoption after comparing the complete schema to the checked-in `20260922_045859_homepage_content.json` snapshot. Do not mark either the core baseline or Pages/Services migration applied unless this comparison passes. Then run the remaining migrations normally. See `database-migrations.md` for the project's migration safety guidance.
