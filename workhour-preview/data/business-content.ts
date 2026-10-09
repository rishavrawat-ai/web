export type BusinessCopySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

// Expanded client copy shared between the two sitemap documents, grouped for detail pages.
export const businessContent: Record<string, BusinessCopySection[]> = {
  inceptura: [
    { title: 'Ideation to execution', paragraphs: [
      'Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion. Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization. By operating as an embedded extension of our clients’ founding and leadership teams, we help transform raw ideas into scalable, compliant and investor-ready businesses.',
      'With a vision of Ideation to Execution, Inceptura provides a single umbrella of mentorship, operational support, and strategic guidance so that founders can focus on innovation, customers, and product-market fit while we handle the operational backbone required for sustainable growth.',
    ] },
    { title: 'A partner across the business lifecycle', paragraphs: [
      'Inceptura is built on the belief that ambitious founders need more than ad-hoc consulting or transactional services. They need a committed partner that understands the full lifecycle of a business and can orchestrate all the critical functions required to grow.',
      'Our multidisciplinary team brings together experts in corporate law and compliance, strategy consulting, HR and payroll, event production, travel and logistics, and cross-border market entry. This allows us to offer a unified solution instead of fragmented vendor relationships, reducing friction, cost, and execution risk for our clients.',
      'Inceptura offers a modular yet integrated portfolio of services that collectively form a robust growth-enablement platform. Clients can engage us at any stage of their journey, while benefitting most when we partner from the earliest ideation stage.',
    ] },
    { title: 'Problem statement and market need', paragraphs: [
      'Startups and scaling businesses face a complex, fragmented landscape of operational requirements. Founders are forced to juggle multiple vendors while trying to build products, raise capital, and win customers. This often leads to costly mistakes, lost opportunities, and burnout.',
    ] },
  ],
  employaa: [
    { title: 'Recruitment market context', paragraphs: [
      'The recruitment and staffing industry continues to expand, driven by factors such as increased specialization of roles, rapid business growth cycles, and the rising preference for flexible workforce models. Companies are increasingly outsourcing recruitment and staffing functions to specialized partners to gain access to wider talent pools, reduce hiring timelines, and ensure compliance with labor regulations.',
      'Outsourced staffing solutions are particularly attractive to organizations that need to manage headcount flexibility, control fixed costs, and navigate complex regulatory requirements for short-term or project-based employees.',
    ] },
    { title: 'Recruitment and staffing solutions', paragraphs: [
      'Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries. We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.',
      'Employaa’s service portfolio includes direct hiring (recruit-only) and full-service staffing on Employaa’s payroll. This dual-model approach enables client organizations to flexibly scale their workforce while optimizing costs, mitigating compliance risks, and reducing time-to-hire.',
      'Employaa partners with multiple organizations to source, assess, and onboard talent across a wide range of functions and experience levels. The company operates with a professional delivery model driven by experienced recruiters, standardized processes, and strong client relationships.',
    ] },
    { title: 'Key attributes of Employaa’s positioning', bullets: [
      'Coverage of roles from junior, mid-level, managerial to CXO and leadership positions',
      'Flexible engagement models: recruit-only and full outsourced staffing on Employaa’s payroll',
      'Sector-agnostic approach with capacity to serve multiple industries',
      'Emphasis on speed, accuracy of profiles, and long-term client partnerships',
    ] },
    { title: 'Brand identity', paragraphs: [
      'The brand identity for Employaa is designed to reflect professionalism, reliability, and modern HR expertise. Clean typography and a corporate colour palette reinforce trust and simplicity, supporting both digital and print communication materials.',
    ] },
  ],
  thinkrunspace: [
    { title: 'Flexible workspace market', paragraphs: [
      'The global flexible workspace and coworking market continues to expand, driven by hybrid work trends, rising real estate costs, and the need for agility. India is one of the fastest-growing flexible workspace markets, with strong adoption by IT/ITeS, startups, GCCs (Global Capability Centers), and professional services firms. Internationally, gateway cities in Asia-Pacific, Europe, and North America are seeing sustained demand from enterprises consolidating or decentralizing their physical footprints.',
    ] },
    { title: 'Workspace solutions', paragraphs: [
      'ThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries. We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support. Our model is designed to scale rapidly across geographies while maintaining a high level of customization, service quality, and technology integration.',
    ] },
    { title: 'Positioning and ambition', paragraphs: [
      'The company is positioned to capture the growing global demand for flexible workspaces driven by hybrid work models, cost optimization, and business expansion into new markets. ThinkRunSpace differentiates itself from competitors in India and internationally through a highly modular product offering, strong enterprise-grade service levels, deep technology integration, and a global-yet-local operating model.',
      'We aim to establish ThinkRunSpace as the preferred workspace partner for startups, SMEs, and large enterprises seeking reliable, scalable, and customizable office solutions without the capital and operational burden of traditional leasing.',
    ] },
  ],
  'leaders-pinnacle': [
    { title: 'Events and market context', paragraphs: [
      'The global event management industry continues to grow as organizations prioritize direct engagement with customers, partners, and employees. In B2B markets, conferences remain the leading format for thought leadership and networking, while digital channels such as webinars and virtual events are increasingly used for targeted lead generation.',
      'In India and the broader Asia-MEA corridor, demand is driven by digital transformation, infrastructure investments, financial services expansion, and government-led initiatives. Corporate event budgets are shifting from purely celebratory events to strategic, content-rich platforms that influence revenue pipelines and stakeholder relationships.',
    ] },
    { title: 'Business events and market intelligence', paragraphs: [
      'Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA), and a global powerhouse dedicated to shaping the future of business. With decades of deep-rooted experience in global business ecosystems, we serve as a catalyst for growth, innovation, and market expansion—bringing together influential leaders, dynamic innovators, and key decision-makers from across industries and continents. We design and deliver high-impact international conferences, summits, exhibitions, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning, alongside strategic market intelligence.',
      'Our expertise extends far beyond event curation. We provide strategic market research, comprehensive opportunity mapping, and the identification of high-value business prospects across diverse geographies. With an exceptional grasp of international markets, we enable organizations to explore emerging economies, access new regions, discover frontier technologies, and forge partnerships that drive long-term success.',
    ] },
    { title: 'Event approach', paragraphs: [
      'Positioned at the intersection of live, virtual, and hybrid experiences, Leaders Pinnacle focuses on knowledge-driven, revenue-focused events for enterprises, governments, and industry associations. Our model combines strategic content development, precise audience acquisition, strong partner ecosystems, and robust operational execution.',
      'Our vision is to become a preferred event partner for B2B brands expanding across emerging markets, by consistently delivering measurable business outcomes rather than just well-produced events.',
      'Leaders Pinnacle operates as a strategic partner to corporate and institutional clients, managing the full lifecycle of events from concept and content strategy to delivery and post-event analytics. We work across sectors such as technology, BFSI, manufacturing, healthcare, energy, and public sector, with a strong emphasis on thought leadership and demand generation.',
      'At Leaders Pinnacle, we combine insight, experience, and innovation to create platforms that inspire collaboration, foster investment, and unlock transformative opportunities. Driven by a commitment to excellence and meaningful engagement, we stand as a trusted partner for companies seeking to scale, innovate, and lead in an increasingly interconnected and competitive world.',
    ] },
  ],
  'go-travel-global': [
    { title: 'Travel market trends', paragraphs: [
      'The global travel and tourism sector is rebounding and transforming, driven by renewed demand, hybrid work, and the blending of business and leisure travel. Corporates are increasingly seeking reliable partners that can manage complex visa and travel requirements, while retail travellers are prioritizing curated, safe, and experience-rich itineraries.',
    ], bullets: [
      'Rising corporate focus on travel compliance, duty of care, and cost control.',
      'Shift from mass-market tours to personalized and small-group experiences.',
      'Growing interest in nature, wellness, cultural immersion, and sustainable travel.',
      'Increased reliance on digital channels for research, booking, and traveller support.',
    ] },
    { title: 'Corporate and leisure travel', paragraphs: [
      'Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment. The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.',
      'Go Travel Global is a tour and travel solutions provider with a strong foundation in corporate travel services, particularly in visa management and stay arrangements for business travellers. Building on this core expertise, the company is diversifying into curated leisure travel for individuals, families, and special interest groups.',
    ] },
    { title: 'End-to-end travel experiences', paragraphs: [
      'Through strategic collaborations with established international tour operators and destination management companies, Go Travel Global offers end-to-end travel experiences that integrate visa processing, flight coordination, accommodation, local transfers, curated activities, and travel assistance. The company aims to become a trusted one-stop travel partner for both corporate and retail travellers, known for reliability, customization, and elevated service quality.',
      'The company operates as a high-touch service organization, combining expert travel consulting with robust partnerships across key global destinations to ensure reliability, compliance, and traveller satisfaction.',
    ] },
  ],
}

export const homepageBusinessIntros: Record<string, string> = {
  inceptura: 'Inceptura supports startups and growing enterprises from early ideas through business execution and global expansion.',
  employaa: 'Employaa provides permanent recruitment and outsourced staffing for roles from entry-level to senior leadership.',
  remunerax: 'Remunerax provides payroll and workforce outsourcing with technology and expert human support.',
  'thinkrunspace': 'ThinkRunSpace provides flexible physical and virtual workspaces with configurable office support.',
  'leaders-pinnacle': 'Leaders Pinnacle designs conferences, trade expos, corporate events, webinars, and podcasts for B2B audiences.',
  elevatrain: 'Elevatrain designs and delivers corporate training and workshops across compliance, process, technology, leadership, and communication.',
  'go-travel-global': 'Go Travel Global provides corporate visa, travel, and stay support alongside curated leisure travel.',
}
