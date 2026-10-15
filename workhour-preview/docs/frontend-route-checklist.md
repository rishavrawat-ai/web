# Frontend route and interaction checklist

Review target: every listed route at 390px and 1440px; representative complex pages at 768px. Check page identity, content, navigation destinations, image load/crop, and horizontal overflow. Desktop/mobile screenshots and machine-readable results are stored in `docs/final-review-run/`.

## Main Workhour site (19 routes)

- [x] `/` — home carousel, business tabs, brand destinations, featured announcement, three media cards, service links, footer.
- [x] `/about` — nine sections in the requested order, with matching About navigation anchors and coordinated Vision/Mission cards.
- [x] `/businesses` — seven illustrated business cards link directly to their standalone brand experiences.
- [x] `/businesses/inceptura`, `/businesses/employaa`, `/businesses/remunerax`, `/businesses/go-travel-global`, `/businesses/elevatrain`, `/businesses/thinkrunspace`, `/businesses/leaders-pinnacle` — business profiles with matching brand links.
- [x] `/services` — three service cards and detail destinations.
- [x] `/services/website-designing`, `/services/content-animation`, `/services/seo-marketing` — service audience, process, scope, benefits, and related-service navigation.
- [x] `/careers` — group work areas and current-opportunity empty state.
- [x] `/contact` — validated required enquiry fields, honest submission-unavailable state, business and service navigation.
- [x] `/global-presence` — Natural Earth country map and accessible provisional country list from one data source.
- [x] `/announcements` — IGNITA title and honest no-details archive state.
- [x] `/news-media` — three supplied media topics, illustrative assets, and relevant service destinations.

## Standalone brand sites (71 routes)

Each brand includes Home, About, its exact menu index label, Contact, and every requested service detail. Brands with `Our Global Reach` in the supplied sitemap also include that route.

- [x] Inceptura `/brands/inceptura`: Home, About, Offerings, Contact, Our Global Reach, plus 7 details — Company Registration & Compliance; Business Strategy & Growth Planning; Talent Acquisition; Event Management; Travel & Logistics; International Expansions; Revenue Checks & Performance Monitoring.
- [x] Employaa `/brands/employaa`: Home, About, Services, Contact, Our Global Reach, plus 7 details — Permanent Hiring; Contract Hiring; IT/Tech Staffing; RPO; Campus Hiring; Bulk Hiring; GIG / Industry Specific.
- [x] Remunerax `/brands/remunerax`: Home, About, Services, Contact, plus 6 details — Payroll Processing; Statutory Compliances; Tax Management; Employee Self Service Portal; Full & Final Settlement; Support for Contractual.
- [x] Go Travel Global `/brands/go-travel-global`: Home, About, Services, Contact, plus 4 details — Visa Assistance & Documentation; Corporate & Business Travel; Domestic & Intl Tours; Customized Travel planning.
- [x] Elevatrain `/brands/elevatrain`: Home, About, Trainings, Contact, plus 6 details — Tech & Digital Skills; Dev Ops & Agile; Six Sigma & Process Excellence; Mindfulness; Project & Program Management; Communication & Soft Skills.
- [x] ThinkRunSpace `/brands/thinkrunspace`: Home, About, Offerings, Contact, Our Global Reach, plus 4 details — Serviced & Managed offices; Co-Working Spaces; Virtual Office Solutions; Meeting Rooms & Business Infra.
- [x] Leaders Pinnacle `/brands/leaders-pinnacle`: Home, About, Services, Contact, Our Global Reach, plus 5 details — Strategic Conferences; Trade Expos & Exhibitions; Bespoke Corporate Events; Webinars & Virtual Events; Podcast & Content Series.

## Shared control checks

- [x] Main navigation and brand navigation expose keyboard-operable menus; mobile navigation opens and closes at 390px.
- [x] Search returns in-site destinations for brands, services, and pages; Escape closes the panel.
- [x] Home carousel has previous/next, direct slide, pause/resume controls and reduced-motion handling.
- [x] Business selector exposes selected tab/panel relationships and arrow-key movement.
- [x] Breadcrumbs, service index links, brand cross-navigation, contact guidance, and footer destinations stay on known routes.
- [x] Generated/editorial and business images have descriptive alt text, responsive sizes, and cover crops.
- [x] No disabled contact/newsletter shell, review banner, or public implementation note remains.
