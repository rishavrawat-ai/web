# Brand sites

## Host mapping

Brand selection is an exact hostname lookup. Configure it at runtime with comma-separated `hostname=business-slug` entries:

```text
BRAND_HOSTS=employaa.localhost=employaa
```

The local default maps only `employaa.localhost` to the existing `employaa` Businesses record. Ports are ignored; parent/sibling subdomains are not inferred. Unknown hosts do not select any brand. Keep the Payload admin on the main site host. API requests, Next static assets, and files are not rewritten by the brand host proxy.

## Brand content

`Brand Pages` is an independent draft-enabled collection. Every record belongs to one Businesses record; a database unique index scopes slugs to that owner. `Pages` and `Services` continue to represent main-site content. A brand route requires both a resolved hostname and a published page belonging to that resolved business. Published changes are server-rendered dynamically and require no rebuild.

To seed the supplied Employaa copy, first apply migrations and ensure the existing Employaa Businesses record exists, then run:

```powershell
npm run import:employaa-brand
```

The importer creates missing records as drafts. It skips existing slugs for that brand without changing their content or publication status. Service titles are supplied; descriptions and brand-specific office locations remain empty until the client supplies them.

Brand colours are configurable on the Businesses record (`brandPrimaryColor`, `brandAccentColor`, and `brandBackgroundColor`). The brand logo uses its published Businesses logo; otherwise the shared header and footer display the text brand name. `brandSiteUrl` on Businesses controls the optional destination link on the main `/businesses/{slug}` introduction; leave it blank until a destination is confirmed.

## Migrations

Fresh installations run the checked-in chain in order, including `20261009_042723_brand_site_foundation`. Existing dev-pushed databases that already contain the Pages/Services schema require an explicit adoption after comparing the complete schema to the checked-in `20260922_045859_homepage_content.json` snapshot. Do not mark either the core baseline or Pages/Services migration applied unless this comparison passes. Then run the remaining migrations normally. See `database-migrations.md` for the project's migration safety guidance.
