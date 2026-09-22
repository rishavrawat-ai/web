export type Business = { slug: string; name: string; intro: string; detail: string; mark: string; image: string }

export const heroSlides = [
  { headline: 'Innovate to Exist', number: '01', image: '/hero-innovate.webp' },
  { headline: 'Progress never sleeps', number: '02', image: '/hero-progress.webp' },
  { headline: 'Evolve beyond limits', number: '03', image: '/hero-evolve.webp' },
  { headline: 'Transformation is survival', number: '04', image: '/hero-transform.webp' },
] as const

export const businesses: Business[] = [
  { slug: 'inceptura', name: 'Inceptura', mark: 'IN', image: '/business-inceptura.webp', intro: 'Inceptura is a strategic growth partner designed to support startups and growing enterprises from the earliest spark of an idea through full execution and global expansion.', detail: 'Our integrated service model covers company registration and compliance, business strategy, talent acquisition and payroll, event management, travel and logistics, international expansion, and revenue optimization.' },
  { slug: 'employaa', name: 'Employaa', mark: 'EM', image: '/business-employaa.webp', intro: 'Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries.', detail: 'We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions.' },
  { slug: 'remunerax', name: 'Remunerax', mark: 'RE', image: '/business-remunerax.webp', intro: 'Remunerax is a specialized payroll and workforce outsourcing company focused on delivering accurate, compliant, and scalable payroll and team management solutions for businesses across multiple industries.', detail: 'By combining robust technology with expert human support, Remunerax enables organizations to reduce administrative burden, maintain regulatory compliance, and focus internal resources on strategic growth.' },
  { slug: 'thinkrunspace', name: 'ThinkRunSpace', mark: 'TR', image: '/business-thinkrunspace.webp', intro: 'ThinkRunSpace is a next-generation workspace solutions company specializing in flexible office spaces for B2B clients, offering both physical and virtual offices across multiple cities and countries.', detail: 'We provide configurable work environments ranging from bare-shell units to fully furnished, plug-and-play offices, supported by modular infrastructure options, cafeteria services, and professional administrative support.' },
  { slug: 'leaders-pinnacle', name: 'Leaders Pinnacle', mark: 'LP', image: '/business-leaders-pinnacle.webp', intro: 'Leaders Pinnacle is a specialist B2B event management company with an active presence across India, wider Asia, and the Middle East & Africa (MEA).', detail: 'We design and deliver high-impact conferences, trade expos, bespoke corporate events, webinars, and podcasts that help brands engage decision-makers, generate qualified leads, and strengthen their market positioning.' },
  { slug: 'elevatrain', name: 'Elevatrain', mark: 'EL', image: '/business-elevatrain.webp', intro: 'Elevatrain is a specialist corporate training and workshop provider focused on performance-critical capability building for organizations.', detail: 'With deep expertise in compliance, process excellence, technology, leadership, and communication, Elevatrain designs, delivers, and scales training solutions for B2B clients across industries.' },
  { slug: 'go-travel-global', name: 'Go Travel Global', mark: 'GT', image: '/business-gotravel.webp', intro: 'Go Travel Global is a specialized tour and travel company focused on delivering seamless visa, travel, and stay solutions for corporate clients, while strategically expanding into the business-to-consumer (B2C) segment.', detail: 'The company designs and manages curated group tours, family holidays, and individual travel experiences across Europe, Nepal, key Asian destinations, African safaris, and other high-demand global hotspots.' },
]

export const values = [
  { display: 'Resilience', original: 'Endurance or Resilience', text: 'With unwavering endurance and resilience, we power your business through every challenge from ideation to execution.' },
  { display: 'Pioneering', original: 'Pioneering', text: 'Pioneering your path from ideation to execution, we spark innovation across every facet of business growth.' },
  { display: 'Legacy', original: 'Influence or Legacy', text: 'From bold ideas to flawless execution,  our Influence or Legacy transforms visions into thriving realities.' },
]

export const media = [
  { title: 'IGNITA', kicker: 'Featured announcement', tone: 'sunset', text: 'A place for the next chapter of the Workhour story.', link: 'Read the announcement' },
  { title: 'PodCast of Mindfulness', kicker: 'Media', tone: 'mint', text: 'A supplied title awaiting final editorial copy and imagery.', link: 'Explore the story' },
  { title: 'joint event with ARC, SNU', kicker: 'Media', tone: 'blue', text: 'Event imagery and final description will be added when supplied.', link: 'View media' },
]
