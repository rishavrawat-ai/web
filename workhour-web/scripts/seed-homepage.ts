import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const businesses = [
  {
    slug: 'inceptura',
    name: 'Inceptura',
    displayOrder: 1,
    homepageIntroduction:
      'Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion. Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization. By operating as an embedded extension of our clients’ founding and leadership teams, we help transform raw ideas into scalable, compliant and investor-ready businesses.',
    detailedIntroduction:
      'Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion. Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization. By operating as an embedded extension of our clients’ founding and leadership teams, we help transform raw ideas into scalable, compliant and investor-ready businesses.\n\nWith a vision of Ideation to Execution, Inceptura provides a single umbrella of mentorship, operational support, and strategic guidance so that founders can focus on innovation, customers, and product-market fit while we handle the operational backbone required for sustainable growth.\n\nInceptura is built on the belief that ambitious founders need more than ad-hoc consulting or transactional services. They need a committed partner that understands the full lifecycle of a business and can orchestrate all the critical functions required to grow.\n\nOur multidisciplinary team brings together experts in corporate law and compliance, strategy consulting, HR and payroll, event production, travel and logistics, and cross-border market entry. This allows us to offer a unified solution instead of fragmented vendor relationships, reducing friction, cost, and execution risk for our clients.\n\nInceptura offers a modular yet integrated portfolio of services that collectively form a robust growth-enablement platform. Clients can engage us at any stage of their journey, while benefitting most when we partner from the earliest ideation stage.',
  },
  {
    slug: 'employaa',
    name: 'Employaa',
    displayOrder: 2,
    homepageIntroduction:
      'Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries. We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.',
    detailedIntroduction:
      'Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries. We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.\n\nEmployaa’s service portfolio includes direct hiring (recruit-only) and full-service staffing on Employaa’s payroll. This dual-model approach enables client organizations to flexibly scale their workforce while optimizing costs, mitigating compliance risks, and reducing time-to-hire.\n\nEmployaa partners with multiple organizations to source, assess, and onboard talent across a wide range of functions and experience levels. The company operates with a professional delivery model driven by experienced recruiters, standardized processes, and strong client relationships.\n\nKey attributes of Employaa’s positioning include:\n\nCoverage of roles from junior, mid-level, managerial to CXO and leadership positions\nFlexible engagement models: recruit-only and full outsourced staffing on Employaa’s payroll\nSector-agnostic approach with capacity to serve multiple industries\nEmphasis on speed, accuracy of profiles, and long-term client partnerships\n\nThe brand identity for Employaa is designed to reflect professionalism, reliability, and modern HR expertise. Clean typography and a corporate colour palette reinforce trust and simplicity, supporting both digital and print communication materials.',
  },
  {
    slug: 'remunerax',
    name: 'Remunerax',
    displayOrder: 3,
    homepageIntroduction:
      'Remunerax is a specialized payroll and workforce outsourcing company focused on delivering accurate, compliant, and scalable payroll and team management solutions for businesses across multiple industries. By combining robust technology with expert human support, Remunerax enables organizations to reduce administrative burden, maintain regulatory compliance, and focus internal resources on strategic growth.',
    detailedIntroduction:
      'Remunerax is a specialized payroll and workforce outsourcing company focused on delivering accurate, compliant, and scalable payroll and team management solutions for businesses across multiple industries. By combining robust technology with expert human support, Remunerax enables organizations to reduce administrative burden, maintain regulatory compliance, and focus internal resources on strategic growth.\n\nPositioned within the rapidly expanding global BPO (Business Process Outsourcing) market, Remunerax addresses the increasing demand for reliable payroll outsourcing driven by complex regulatory environments, remote and distributed teams, and the need for cost-efficient operations. Our service portfolio covers end-to-end payroll outsourcing, employment administration, team staffing and management, and compliance support across jurisdictions.\n\nRemunerax is a B2B-focused payroll and workforce outsourcing provider serving small, mid-sized, and growth-stage enterprises. We operate as an extension of our clients’ HR and finance departments, delivering secure and compliant payroll processing and complete team outsourcing solutions.\n\nCore characteristics of Remunerax:\n\nIndustry: BPO / Payroll Outsourcing / Workforce Management\nBusiness Model: Subscription-based and volume-based service contracts\nTarget Clients: SMEs, scale-ups, and multi-entity organizations operating locally or across borders\nService Delivery: Cloud-based platform complemented by regional payroll and compliance experts',
  },
  {
    slug: 'gotravelglobal',
    name: 'Go Travel Global',
    displayOrder: 4,
    homepageIntroduction:
      'Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment. The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.',
    detailedIntroduction:
      'Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment. The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.\n\nThrough strategic collaborations with established international tour operators and destination management companies, Go Travel Global offers end-to-end travel experiences that integrate visa processing, flight coordination, accommodation, local transfers, curated activities, and travel assistance. The company aims to become a trusted one-stop travel partner for both corporate and retail travellers, known for reliability, customization, and elevated service quality.\n\nThe company operates as a high-touch service organization, combining expert travel consulting with robust partnerships across key global destinations to ensure reliability, compliance, and traveller satisfaction.',
  },
  {
    slug: 'elevatrain',
    name: 'Elevatrain',
    displayOrder: 5,
    homepageIntroduction:
      'Elevatrain is a specialist corporate training and workshop provider focused on performance-critical capability building for organizations. With deep expertise in compliance, process excellence, technology, leadership, and communication, Elevatrain designs, delivers, and scales training solutions for B2B clients across industries.',
    detailedIntroduction:
      'Elevatrain is a specialist corporate training and workshop provider focused on performance-critical capability building for organizations. With deep expertise in compliance, process excellence, technology, leadership, and communication, Elevatrain designs, delivers, and scales training solutions for B2B clients across industries.\n\nThe company’s core offerings include POSH (Prevention of Sexual Harassment) compliance programs, Six Sigma and Lean quality training, technology upskilling, project management certifications, and business communication interventions. Elevatrain’s strategic objective is to establish a strong niche in international markets by combining domain expertise, blended delivery models, and measurable business outcomes.\n\nElevatrain’s growth strategy, market positioning, operational model, and financial roadmap is moving towards the expansion from its current domestic base into global markets in Asia-Pacific, Middle East, Africa and Europe.\n\nThe company differentiates itself through customized training design, domain-certified trainers, and strong emphasis on compliance, process excellence, and technical rigor.',
  },
  {
    slug: 'thinkrunspace',
    name: 'ThinkRunSpace',
    displayOrder: 6,
    homepageIntroduction:
      'ThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries. We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support. Our model is designed to scale rapidly across geographies while maintaining a high level of customization, service quality, and technology integration.',
    detailedIntroduction:
      'The global flexible workspace and coworking market continues to expand, driven by hybrid work trends, rising real estate costs, and the need for agility. India is one of the fastest-growing flexible workspace markets, with strong adoption by IT/ITeS, startups, GCCs (Global Capability Centers), and professional services firms. Internationally, gateway cities in Asia-Pacific, Europe, and North America are seeing sustained demand from enterprises consolidating or decentralizing their physical footprints.\n\nThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries. We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support. Our model is designed to scale rapidly across geographies while maintaining a high level of customization, service quality, and technology integration.\n\nThe company is positioned to capture the growing global demand for flexible workspaces driven by hybrid work models, cost optimization, and business expansion into new markets. ThinkRunSpace differentiates itself from competitors in India and internationally through a highly modular product offering, strong enterprise-grade service levels, deep technology integration, and a global-yet-local operating model.\n\nWe aim to establish ThinkRunSpace as the preferred workspace partner for startups, SMEs, and large enterprises seeking reliable, scalable, and customizable office solutions without the capital and operational burden of traditional leasing.',
  },
  {
    slug: 'leaderspinnacle',
    name: 'Leaders Pinnacle',
    displayOrder: 7,
    homepageIntroduction:
      'Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA). We design and deliver high-impact conferences, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning.',
    detailedIntroduction:
      'Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA). We design and deliver high-impact conferences, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning.\n\nPositioned at the intersection of live, virtual, and hybrid experiences, Leaders Pinnacle focuses on knowledge-driven, revenue-focused events for enterprises, governments, and industry associations. Our model combines strategic content development, precise audience acquisition, strong partner ecosystems, and robust operational execution.\n\nOur vision is to become a preferred event partner for B2B brands expanding across emerging markets, by consistently delivering measurable business outcomes rather than just well-produced events.\n\nLeaders Pinnacle operates as a strategic partner to corporate and institutional clients, managing the full lifecycle of events from concept and content strategy to delivery and post-event analytics. We work across sectors such as technology, BFSI, manufacturing, healthcare, energy, and public sector, with a strong emphasis on thought leadership and demand generation.',
  },
] as const

const homepageData = {
  heroSlides: [
    { headline: 'Innovate to Exist', ctaLabel: 'About Us' },
    { headline: 'Progress never sleeps', ctaLabel: 'About Us' },
    { headline: 'Evolve beyond limits', ctaLabel: 'About Us' },
    { headline: 'Transformation is survival', ctaLabel: 'About Us' },
  ],
  intro: {
    heading: 'Together We Thrive',
    description: 'WorkHour Business - we power your complete business journey.',
  },
  valuePanels: [
    {
      heading: 'Endurance or Resilience',
      description:
        'With unwavering endurance and resilience, we power your business through every challenge from ideation to execution. Whether building robust recruitment pipelines that withstand market shifts, establishing reliable virtual and serviced offices for long-term stability, ensuring seamless travel continuity, fueling ideation consulting with persistent creativity, sustaining vibrant networking platforms, delivering enduring events that create lasting impact, or providing trainings that forge unbreakable skills—we stand strong, adapting and thriving to fuel your sustained success.',
    },
    {
      heading: 'Pioneering',
      description:
        'Pioneering your path from ideation to execution, we spark innovation across every facet of business growth. Through creative ideation consulting that uncovers fresh strategies, agile recruitment and staffing of visionary talent, flexible virtual and serviced offices for rapid scaling, seamless travel orchestration, dynamic networking platforms that forge connections, impactful events that inspire action, and tailored trainings that build lasting skills—we deliver breakthrough solutions driving momentum and transformation.',
    },
    {
      heading: 'Influence or Legacy',
      description:
        'From bold ideas to flawless execution,  our Influence or Legacy transforms visions into thriving realities. We streamline recruitment and staffing for top talent, provide flexible virtual and serviced offices, handle seamless travel logistics, deliver ideation consulting that sparks innovation, build powerful networking platforms, orchestrate high-impact events, and offer targeted trainings—empowering your complete business journey with momentum and measurable growth.',
    },
  ],
  featuredAnnouncement: {},
  mediaCards: [
    { heading: 'IGNITA' },
    { heading: 'PodCast of Mindfulness' },
    { heading: 'joint event with ARC, SNU' },
  ],
}

const main = async () => {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD to an existing admin user before seeding.')
  }

  const payload = await getPayload({ config })
  const login = await payload.login({
    collection: 'users',
    data: { email, password },
    overrideAccess: false,
  })

  if (!login.user) {
    throw new Error('The seed admin login did not return an authenticated user.')
  }

  const requestContext = {
    overrideAccess: false,
    user: login.user,
  }

  const businessIDs: number[] = []

  for (const business of businesses) {
    const existing = await payload.find({
      collection: 'businesses',
      depth: 0,
      limit: 1,
      overrideAccess: false,
      user: login.user,
      where: { slug: { equals: business.slug } },
    })

    if (existing.docs[0]) {
      businessIDs.push(Number(existing.docs[0].id))
      console.log(`Preserved existing business: ${business.slug}`)
      continue
    }

    const created = await payload.create({
      collection: 'businesses',
      data: { ...business, _status: 'draft' },
      ...requestContext,
    })

    businessIDs.push(Number(created.id))
    console.log(`Created draft business: ${business.slug}`)
  }

  const homepageVersions = await payload.findGlobalVersions({
    depth: 0,
    limit: 1,
    overrideAccess: false,
    slug: 'homepage',
    user: login.user,
  })

  if (homepageVersions.docs.length === 0) {
    await payload.updateGlobal({
      data: {
        ...homepageData,
        businesses: businessIDs.map((business) => ({ business })),
        _status: 'draft',
      },
      ...requestContext,
      draft: true,
      slug: 'homepage',
    })
    console.log('Created draft homepage global.')
  } else {
    console.log('Preserved existing homepage global.')
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
