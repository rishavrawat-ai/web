# Workhour Business website requirements

Source reviewed: `Home Page WHB.docx` and `WhatsApp Image 2026-09-21 at 10.23.55 AM.jpeg` in the workspace. This is a requirements record only; no website has been built and no dependencies were installed.

## Scope and confirmed context

- One main Workhour Business website and seven brand websites on subdomains.
- Informational service websites with one central content-editing admin.
- Discussed budget: INR 20,000. The requirements below are retained in full; the scope and backend/admin effort appear material for that budget and should be explicitly re-estimated.
- Main-site business introductions link to the corresponding brand websites.
- The document calls `/brand` paths “subdomains”. These are different implementations: `/inceptura` is a path on the main domain, while `www.inceptura.com` is a separate domain/subdomain. This conflict is recorded for decision rather than resolved by assumption.
- No bookings, payments, employee portal, or applicant-tracking system is requested.

### Task 2 clarifications

- Brand websites use true subdomains, for example `employaa.workhourbusiness.com`; production domain/DNS remains unverified.
- Remove the Reliance Foundation, AGM, Investors and Life at Reliance homepage sections from the reference-derived layout.
- The featured announcement and the three media cards are separate homepage sections.
- Cross-brand search, newsletter delivery and advanced editorial workflows remain unconfirmed.

## 1. Main-site sitemap and homepage sections

### Main navigation / sitemap

The requested main menu, in document order:

1. About Us
2. Businesses
3. Announcement
4. Careers
5. News & Media
6. Search bar

The document also explicitly refers to or requires these main-site destinations/features:

- Contact Us; the header Contact Us item should redirect to the Contact Us page.
- About Us page, with the following menu items: Our History, Awards, Certifications, Our Impact, Corporate Social Responsibility, Presence.
- Businesses page/section with seven brands: Inceptura, Employaa, Remunerax, ThinkRunSpace, Leaders Pinnacle, Elevatrain, Go Travel Global.
- Careers page.
- Announcement content.
- News & Media content. No detailed page copy was supplied.
- Search.
- Newsletter subscription in the reference footer; no client copy or provider was supplied.

Seven brand websites are expected, one for each business. The document supplies each brand’s content as a brand-page introduction and says “Read More” should link to a path and/or domain. Exact link targets are unresolved; see Pending decisions.

### Homepage sections in document order

The DOCX is titled “Home Page” and describes the sections in this order:

1. **Header / top utility area** — replace the Reliance logo with Workhour; remove NSE/BSE values, eB2B and Fraud Alert; redirect Contact Us to the Contact Us page.
2. **Main menu** — About Us, Businesses, Announcement, Careers, News & Media, Search bar.
3. **Hero/banner** — multiple rotating banners with different punch lines and one link below them: About Us, linking to the About Us page. Punch lines are listed below under supplied copy.
4. **Intro/value statement** — change “We Care” to “Together We Thrive”; show the supplied WorkHour Business phrase.
5. **Business showcase** — replace the current right-side options with the seven brand names. The document says a replacement background image will be provided. Each brand has an introduction and a Read More link to its brand website.
6. **Three-value section** — rename Sustainability to Endurance or Resilience; Innovation to Pioneering; Our Impact to Influence or Legacy. Each has supplied copy.
7. **Feature/media section** — the left-side text can describe IGNITA. The document refers to two images at one point, then describes three image cards: IGNITA, Mindfulness Podcast, and a joint event with ARC, SNU. These are not clicking images; hyperlinks are below the images.
8. **Unnamed section** — remove this section.
9. **Unnamed section** — remove this section.
10. **Unnamed section** — remove this section.
11. **Unnamed themed section** — keep this section, with colours as per the theme; the document does not identify its title or copy.
12. **Footer** — keep/develop according to the website flow; the document says it will be discussed. The reference screenshots show a newsletter subscription area, social icons, link columns and legal/footer links, but those are reference layout only.

The screenshots show Reliance layouts such as a header, hero, intro block, business showcase, feature cards, footer and search/newsletter patterns. They are layout references only and must not be treated as Workhour production assets or copy.

## 2. Exact supplied copy, grouped by page

The following is the copy supplied in the DOCX. It is transcribed as provided, including wording, capitalization, punctuation and apparent typos. Client instructions are kept separately in the next section.

### Home page

**Hero punch lines**

- Innovate to Exist
- Progress never sleeps
- Evolve beyond limits
- Transformation is survival

**Intro phrase**

Together We Thrive

WorkHour Business - we power your complete business journey.

**Businesses / brand introductions**

**Inceptura**

Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion. Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization. By operating as an embedded extension of our clients’ founding and leadership teams, we help transform raw ideas into scalable, compliant and investor-ready businesses.

**Employaa**

Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries. We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.

**Remunerax**

Remunerax is a specialized payroll and workforce outsourcing company focused on delivering accurate, compliant, and scalable payroll and team management solutions for businesses across multiple industries. By combining robust technology with expert human support, Remunerax enables organizations to reduce administrative burden, maintain regulatory compliance, and focus internal resources on strategic growth.

**Go Travel Global**

Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment. The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.

**Elevatrain**

Elevatrain is a specialist corporate training and workshop provider focused on performance-critical capability building for organizations. With deep expertise in compliance, process excellence, technology, leadership, and communication, Elevatrain designs, delivers, and scales training solutions for B2B clients across industries.

**ThinkRunSpace**

ThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries. We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support. Our model is designed to scale rapidly across geographies while maintaining a high level of customization, service quality, and technology integration.

**Leaders Pinnacle**

Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA). We design and deliver high-impact conferences, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning.

**Renamed value sections**

**Endurance or Resilience**

With unwavering endurance and resilience, we power your business through every challenge from ideation to execution. Whether building robust recruitment pipelines that withstand market shifts, establishing reliable virtual and serviced offices for long-term stability, ensuring seamless travel continuity, fueling ideation consulting with persistent creativity, sustaining vibrant networking platforms, delivering enduring events that create lasting impact, or providing trainings that forge unbreakable skills—we stand strong, adapting and thriving to fuel your sustained success.

**Pioneering**

Pioneering your path from ideation to execution, we spark innovation across every facet of business growth. Through creative ideation consulting that uncovers fresh strategies, agile recruitment and staffing of visionary talent, flexible virtual and serviced offices for rapid scaling, seamless travel orchestration, dynamic networking platforms that forge connections, impactful events that inspire action, and tailored trainings that build lasting skills—we deliver breakthrough solutions driving momentum and transformation.

**Influence or Legacy**

From bold ideas to flawless execution,  our Influence or Legacy transforms visions into thriving realities. We streamline recruitment and staffing for top talent, provide flexible virtual and serviced offices, handle seamless travel logistics, deliver ideation consulting that sparks innovation, build powerful networking platforms, orchestrate high-impact events, and offer targeted trainings—empowering your complete business journey with momentum and measurable growth.

**Feature/media area**

No final IGNITA description, captions, labels, URLs or event copy was supplied. The document supplies only these descriptors: “IGNITA”, “PodCast of Mindfulness”, and “joint event with ARC, SNU”.

### About Us page

**Menu items**

Our History; Awards; Certifications; Our Impact; Corporate Social Responsibility; Presence

**Our History**

**Our Journey - WorkHour Business**

**From Delhi Startup to Global Outsourcing Powerhouse**

Established in the heart of New Delhi, India WorkHour Business began with a simple yet powerful vision: to empower SMEs, entrepreneurs, and startups with world-class Business Process Outsourcing (BPO) services at affordable rates. What started as a 3-member team handling basic back-office operations for local Indian businesses has phenomenally evolved into a continental outsourcing leader serving India, Asia, Africa, and the Middle East.

**Pioneering Growth Across Continents**

India: Birthplace and talent hub – 70% of our experts based in Delhi-NCR

Asia: Strategic operations in Tier-1 cities (Bangalore, Mumbai, Manila)

Africa: Rapid expansion serving Kenya, Nigeria, South Africa, Egypt

Middle East: GCC powerhouse (UAE, Saudi Arabia, Qatar, Oman)

“WorkHour Promise”: Every client gets a dedicated time allocation for innovation projects alongside routine operations. This unique model ensures continuous value addition – turning transactional clients into strategic partners.

Future Vision: By 2030, become the #1 outsourcing partner for emerging markets, powering 10,000+ SMEs with cutting-edge automation + human expertise.

WorkHour Business – Where Global Ambition Meets Delhi Determination.

**Our Impact**

Since its inception in Delhi, WorkHour Business has created a profound global impact, empowering SMEs, entrepreneurs, and startups across India, Asia, Africa, and the Middle. East to achieve sustainable growth through world-class Business Process Outsourcing services.

From our Delhi headquarters, we’ve driven collective client revenue growth, created many direct jobs across the continents, and pioneered cross-border operations that helped businesses scale regionally—most notably enabling African startups to expand across multiple countries while GCC retailers penetrated digital markets.

Our unique WorkHour Promise—allocating dedicated innovation time per client—has delivered 3.2x average ROI within 18 months, deployed tech stacks and GTM’s saving clients 65% in costs, and maintained a stellar 95% retention rate against the industry average of 75%. Beyond numbers, we’ve empowered women from Tier-2/3 cities, provided first corporate jobs to graduates—truly transforming Delhi’s entrepreneurial spirit into a continental economic force.

**Corporate Social Responsibility**

WorkHour Business is deeply committed to creating shared value beyond profits, channelling our Delhi roots into meaningful societal impact across the regions we serve. Our CSR initiatives focus on Women Empowerment, providing them stable corporate careers consulting and skill development in digital tools and customer service.

We are bringing the “WorkHour Scholars” program sponsoring education for kids from low-income families, while our Africa Skill Bridge initiative will also provide free consulting and mentorship to entrepreneurs.

Through these efforts, we will be impacting lives directly, embodying our belief that true business success measures not just revenue growth, but the communities we uplift along the way.

**Presence**

WorkHour Business proudly operates from our global headquarters in, where our experts power operations across the continents. While our primary delivery hub remains in Delhi-NCR, we’ve strategically expanded to serve clients seamlessly across time zones.

India - HQ + Primary Delivery: Delhi (HQ),

Regional Centre: Bangalore

Regional Centre, Mumbai

Regional Centre, Chandigarh

Asia – Regional Centre: Malaysia

Africa – Regional Centre: Nairobi, Kenya

Regional Centre: Malawi

Regional Centre: Zimbabwe

Regional Centre: South Africa

Regional Centre: Ivory Coast

Regional Centre: Rwanda

Regional Centre: Ghana

Our distributed delivery model ensures 24/7 coverage across multiple languages—from Hindi and Swahili to Arabic and Mandarin. Clients connect through our centralized Delhi dashboard while receiving localized support from regional delivery centres.

Simple truth: One Delhi HQ, global reach. Your business gets world-class outsourcing with a single point of contact.

### Businesses page and brand pages

**Businesses menu**

Inceptura; Employaa; Remunerax; ThinkRunSpace; Leaders Pinnacle; Elevatrain; Go Travel Global

For each brand page, the document supplies the following copy. The supplied home-page introductions above are repeated on their corresponding brand pages.

**Inceptura — Inceptura: Ideation to Execution**

Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion. Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization. By operating as an embedded extension of our clients’ founding and leadership teams, we help transform raw ideas into scalable, compliant and investor-ready businesses.

With a vision of Ideation to Execution, Inceptura provides a single umbrella of mentorship, operational support, and strategic guidance so that founders can focus on innovation, customers, and product-market fit while we handle the operational backbone required for sustainable growth.

Inceptura is built on the belief that ambitious founders need more than ad-hoc consulting or transactional services. They need a committed partner that understands the full lifecycle of a business and can orchestrate all the critical functions required to grow.

Our multidisciplinary team brings together experts in corporate law and compliance, strategy consulting, HR and payroll, event production, travel and logistics, and cross-border market entry. This allows us to offer a unified solution instead of fragmented vendor relationships, reducing friction, cost, and execution risk for our clients.

Inceptura offers a modular yet integrated portfolio of services that collectively form a robust growth-enablement platform. Clients can engage us at any stage of their journey, while benefitting most when we partner from the earliest ideation stage.

**Employaa**

Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries. We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.

Employaa’s service portfolio includes direct hiring (recruit-only) and full-service staffing on Employaa’s payroll. This dual-model approach enables client organizations to flexibly scale their workforce while optimizing costs, mitigating compliance risks, and reducing time-to-hire.

Employaa partners with multiple organizations to source, assess, and onboard talent across a wide range of functions and experience levels. The company operates with a professional delivery model driven by experienced recruiters, standardized processes, and strong client relationships.

Key attributes of Employaa’s positioning include:

- Coverage of roles from junior, mid-level, managerial to CXO and leadership positions
- Flexible engagement models: recruit-only and full outsourced staffing on Employaa’s payroll
- Sector-agnostic approach with capacity to serve multiple industries
- Emphasis on speed, accuracy of profiles, and long-term client partnerships

The brand identity for Employaa is designed to reflect professionalism, reliability, and modern HR expertise. Clean typography and a corporate colour palette reinforce trust and simplicity, supporting both digital and print communication materials.

**Remunerax**

Remunerax is a specialized payroll and workforce outsourcing company focused on delivering accurate, compliant, and scalable payroll and team management solutions for businesses across multiple industries. By combining robust technology with expert human support, Remunerax enables organizations to reduce administrative burden, maintain regulatory compliance, and focus internal resources on strategic growth.

Positioned within the rapidly expanding global BPO (Business Process Outsourcing) market, Remunerax addresses the increasing demand for reliable payroll outsourcing driven by complex regulatory environments, remote and distributed teams, and the need for cost-efficient operations. Our service portfolio covers end-to-end payroll outsourcing, employment administration, team staffing and management, and compliance support across jurisdictions.

Remunerax is a B2B-focused payroll and workforce outsourcing provider serving small, mid-sized, and growth-stage enterprises. We operate as an extension of our clients’ HR and finance departments, delivering secure and compliant payroll processing and complete team outsourcing solutions.

Core characteristics of Remunerax:

- Industry: BPO / Payroll Outsourcing / Workforce Management
- Business Model: Subscription-based and volume-based service contracts
- Target Clients: SMEs, scale-ups, and multi-entity organizations operating locally or across borders
- Service Delivery: Cloud-based platform complemented by regional payroll and compliance experts

**ThinkRunSpace**

The global flexible workspace and coworking market continues to expand, driven by hybrid work trends, rising real estate costs, and the need for agility. India is one of the fastest-growing flexible workspace markets, with strong adoption by IT/ITeS, startups, GCCs (Global Capability Centers), and professional services firms. Internationally, gateway cities in Asia-Pacific, Europe, and North America are seeing sustained demand from enterprises consolidating or decentralizing their physical footprints.

ThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries. We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support. Our model is designed to scale rapidly across geographies while maintaining a high level of customization, service quality, and technology integration.

The company is positioned to capture the growing global demand for flexible workspaces driven by hybrid work models, cost optimization, and business expansion into new markets. ThinkRunSpace differentiates itself from competitors in India and internationally through a highly modular product offering, strong enterprise-grade service levels, deep technology integration, and a global-yet-local operating model.

We aim to establish ThinkRunSpace as the preferred workspace partner for startups, SMEs, and large enterprises seeking reliable, scalable, and customizable office solutions without the capital and operational burden of traditional leasing.

**Leaders Pinnacle**

Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA). We design and deliver high-impact conferences, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning.

Positioned at the intersection of live, virtual, and hybrid experiences, Leaders Pinnacle focuses on knowledge-driven, revenue-focused events for enterprises, governments, and industry associations. Our model combines strategic content development, precise audience acquisition, strong partner ecosystems, and robust operational execution.

Our vision is to become a preferred event partner for B2B brands expanding across emerging markets, by consistently delivering measurable business outcomes rather than just well-produced events.

Leaders Pinnacle operates as a strategic partner to corporate and institutional clients, managing the full lifecycle of events from concept and content strategy to delivery and post-event analytics. We work across sectors such as technology, BFSI, manufacturing, healthcare, energy, and public sector, with a strong emphasis on thought leadership and demand generation.

**Elevatrain**

Elevatrain is a specialist corporate training and workshop provider focused on performance-critical capability building for organizations. With deep expertise in compliance, process excellence, technology, leadership, and communication, Elevatrain designs, delivers, and scales training solutions for B2B clients across industries.

The company’s core offerings include POSH (Prevention of Sexual Harassment) compliance programs, Six Sigma and Lean quality training, technology upskilling, project management certifications, and business communication interventions. Elevatrain’s strategic objective is to establish a strong niche in international markets by combining domain expertise, blended delivery models, and measurable business outcomes.

Elevatrain’s growth strategy, market positioning, operational model, and financial roadmap is moving towards the expansion from its current domestic base into global markets in Asia-Pacific, Middle East, Africa and Europe.

The company differentiates itself through customized training design, domain-certified trainers, and strong emphasis on compliance, process excellence, and technical rigor.

**Go Travel Global**

Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment. The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.

Through strategic collaborations with established international tour operators and destination management companies, Go Travel Global offers end-to-end travel experiences that integrate visa processing, flight coordination, accommodation, local transfers, curated activities, and travel assistance. The company aims to become a trusted one-stop travel partner for both corporate and retail travellers, known for reliability, customization, and elevated service quality.

The company operates as a high-touch service organization, combining expert travel consulting with robust partnerships across key global destinations to ensure reliability, compliance, and traveller satisfaction.

### Careers page

Join Delhi’s Global Outsourcing Powerhouse

We’re always look out for passionate, customer-focused talent to power our 24/7 operations serving SMEs across India, Asia, Africa, and the Middle East.

**Why WorkHour?**

Real Growth; Global Exposure; Flexible Careers; Learning Culture; Competitive Pay

**What we Value**

Positive Attitude; Team player; Willingness to learn; Communication

**Employee Benefits**

Health insurance; Free certification courses; Performance incentives; Career progression

Ready to grow with us?

Apply Now: careers@workhourbusiness.com

WorkHour Business - Where freshers become global professionals

## 3. Required admin-editable content

The central admin should be able to edit and publish, at minimum:

- Main navigation labels, page links and ordering.
- Logo/brand assets, hero/banner images, banner ordering, punch lines and About Us CTA.
- Homepage intro heading and phrase.
- Business/brand names, logos, descriptions, card ordering, images and Read More URLs.
- All About Us menu/page sections, headings, body copy, locations/presence list and any supplied metrics/claims.
- The three renamed value-section headings and copy.
- IGNITA/media cards: headings, descriptions, images, captions and hyperlinks.
- Homepage sections marked to remove/keep, subject to final editorial decisions.
- Careers copy, benefits, values, application email and any future job-listing links. This scope does not include an applicant-tracking system.
- Announcement and News & Media entries: title, date, category/source, excerpt, image, external/internal URL, ordering, publish state and optional detail content.
- Contact Us page content and destination/form settings, once provided.
- Footer links, newsletter label/handling settings, social links, legal links and copyright text.
- Media library uploads, alt text and replacement of the background image/assets.

Admin requirements are inferred from “one central content-editing admin”; roles, approval workflow, audit history, authentication method and hosting are not specified.

## 4. Missing assets, ambiguous instructions and pending decisions

### Assets

- **Readable supplied asset:** `WhatsApp Image 2026-09-21 at 10.23.55 AM.jpeg`, showing the Workhour Business logo. It is a raster JPEG with a white background; no vector/source logo, transparent version, favicon or brand guidelines were supplied.
- **DOCX embedded assets:** 13 PNG screenshots, all visually readable, showing Reliance pages/layouts. They are references only, not production assets.
- Missing: final Workhour hero/banner background image(s); brand logos for all seven businesses; brand-page banner images and quotes; all final business/media photographs; IGNITA image and copy; Mindfulness Podcast image; ARC/SNU event image; “keep this section” assets/copy; About Us awards/certifications content; News & Media/Announcement items; Contact Us copy/details; footer/social/legal assets and links; any icons/fonts; final page-specific image alt text.

### Ambiguities and conflicts

- “Seven brand websites on subdomains” conflicts with the examples `www.workhourbusiness.com/inceptura` and `www.inceptura.com`, which are paths/domains rather than the same thing. Confirm the canonical URL for every brand and whether redirects are required.
- The brand list order differs between the homepage text and the Businesses menu: the homepage lists Go Travel Global before Elevatrain, while the Businesses menu lists ThinkRunSpace, Leaders Pinnacle, Elevatrain, Go Travel Global.
- The homepage says “on the 2 images” but then specifies three image items.
- “In the end” likely means “at the end”, but the intended link placement and CTA labels should be confirmed.
- “Announcement” versus “Announcements” is inconsistent between the main menu and reference screenshot.
- News & Media is in the main menu, but no page structure or copy is supplied.
- “Remove this section” appears three times without identifying the sections; the “keep this section” is also unnamed.
- Contact Us is mentioned only as a redirect target; no address, phone, email, map, form fields, recipient, spam protection or success state is supplied.
- Newsletter subscription appears in the reference screenshots but is not described in the DOCX; confirm whether it is required and what service/process receives subscribers.
- No final decision is supplied on whether external brand links open in the same tab/new tab or whether brand sites are managed/deployed separately.
- “Will finalize the image ... along with the quote” means brand hero images and quotes are pending for all seven brands.
- The budget is INR 20,000, but the requested multi-site architecture, CMS, media management, search and newsletter backend may exceed that budget. Preserve requirements and obtain a staged-scope decision rather than silently removing them.

### Typos, wording issues and unsupported claims to review

These are flagged separately; they are not silently corrected in the exact-copy section:

- “Fraud Aler” appears truncated in the instruction.
- “GO TRAVEL GOBAL” appears in the homepage replacement list; the brand is otherwise “Go Travel Global”.
- “ThinkRunSpaceon” is missing a space.
- “Empllyaa” appears once; the brand is otherwise “Employaa”.
- “PodCast” and “IGNITIA”/“IGNITA” are inconsistent.
- “Middle. East” contains an apparent stray full stop.
- “70% of our experts based in Delhi-NCR”, “By 2030 ... #1”, “10,000+ SMEs”, “3.2x average ROI”, “65% in costs”, “95% retention rate”, “industry average of 75%”, 24/7 coverage, global presence and other business/market claims are unsupported by supplied evidence. Client/legal review and substantiation are required before publication.
- “global headquarters in,” is incomplete.
- “providing them stable corporate careers consulting” is grammatically unclear.
- “We are bringing ... program sponsoring” is grammatically unclear.
- “our financial roadmap is moving towards the expansion” is awkward and potentially time-sensitive.
- “WorkHour Business - Where freshers become global professionals” uses “freshers”, which should be confirmed for the intended audience/region.
- “GTM’s” may need editorial clarification (likely GTM/go-to-market); do not change without approval.

## 5. Features needing real backend behavior

- **Central CMS/admin:** authenticated admin, content CRUD, publish/unpublish, media uploads, link management and a shared content model for the main site and seven brand sites. The exact deployment relationship between central admin and subdomains is pending.
- **Search:** searchable published content across main-site pages, businesses/brand pages, announcements, news/media and careers content; requires indexing/query behavior, empty/error states and admin-controlled visibility. Search UI alone is not sufficient.
- **Announcements and News & Media:** persisted entries, detail pages or external-link handling, date/category metadata, ordering, publish state and admin editing.
- **Newsletter:** email capture, validation, duplicate handling, consent/privacy wording, persistence and an operational delivery/export integration. No provider or notification workflow was supplied, so implementation choice is pending.
- **Contact Us:** at minimum, if a form is intended, server-side validation, spam protection, secure storage or email delivery, success/error states and admin access. The document only confirms a redirect, not a form.
- **Hero/banner rotation:** admin-controlled banner data and ordering, timed/manual rotation, accessible controls and CTA linking.
- **External brand links:** reliable routing/redirects and link validation for the chosen path/domain model.
- **Careers CTA:** mailto link is supplied. No job database, application workflow, employee portal or ATS is requested.

No booking, payment, employee portal or applicant-tracking backend should be added based on the supplied requirements.

## 6. Existing repository stack

No existing website repository or application stack was found. The workspace currently contains:

- `Home Page WHB.docx`
- `WhatsApp Image 2026-09-21 at 10.23.55 AM.jpeg`
- This newly created `docs/requirements.md`

No `package.json`, lockfile, source directory, framework configuration, database schema, CMS configuration or deployment configuration was present. Therefore the existing repository stack is **not established**.

## Client-instruction versus reference-asset boundary

The embedded Reliance screenshots are supplied as visual/layout references. They show Reliance branding, imagery, market values, investor data, corporate claims and footer content; none of those should be copied into production. The Workhour logo JPEG is the only separately supplied brand asset found and should be treated as an asset requiring confirmation of usable quality/format before implementation.
