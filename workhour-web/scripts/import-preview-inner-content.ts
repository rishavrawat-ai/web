import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { globalExpansion, globalPresence, services as previewServices } from '../../workhour-preview/data/content'

type SectionSeed = {
  anchor?: string
  eyebrow?: string
  heading: string
  paragraphs?: string[]
  items?: { title: string; text?: string }[]
  cta?: { label: string; url: string }
  ctaSecondary?: { label: string; url: string }
}

const aboutSections: SectionSeed[] = [
  {
    anchor: 'global-approach', eyebrow: 'Our global approach', heading: 'Global Expansion Made Simple, Scalable, and Risk-Free',
    paragraphs: [globalExpansion.intro, globalExpansion.support],
  },
  { anchor: 'vision', heading: 'Our Vision', paragraphs: [globalExpansion.vision] },
  { anchor: 'mission', heading: 'Our Mission', paragraphs: [globalExpansion.mission] },
  { anchor: 'core-values', heading: 'Core Values', items: globalExpansion.values.map(({ title, text }) => ({ title, text })) },
  {
    anchor: 'in-house-advantage', heading: 'The WorkHour Business In-House Advantage',
    paragraphs: [globalExpansion.advantage, 'When you partner with us, your company gains access to a complete global execution engine:'],
    items: globalExpansion.capabilities.map(({ title, text }) => ({ title, text })),
  },
  {
    anchor: 'audience', heading: 'Built for Growing SMBs and Global Enterprises',
    paragraphs: [globalExpansion.audience, globalExpansion.closing],
    cta: { label: 'Schedule a Global Strategy Call', url: '/contact' },
    ctaSecondary: { label: 'Explore Our Client Centers', url: '/global-presence' },
  },
  {
    anchor: 'history', heading: 'Our History', paragraphs: [
      'Established in the heart of New Delhi, India WorkHour Business began with a simple yet powerful vision: to empower SMEs, entrepreneurs, and startups with world-class Business Process Outsourcing (BPO) services at affordable rates. What started as a 3-member team handling basic back-office operations for local Indian businesses has phenomenally evolved into a continental outsourcing leader serving India, Asia, Africa, and the Middle East.',
      'India: Birthplace and talent hub – 70% of our experts based in Delhi-NCR. Asia: Strategic operations in Tier-1 cities (Bangalore, Mumbai, Manila). Africa: Rapid expansion serving Kenya, Nigeria, South Africa, Egypt. Middle East: GCC powerhouse (UAE, Saudi Arabia, Qatar, Oman).',
      '“WorkHour Promise”: Every client gets a dedicated time allocation for innovation projects alongside routine operations. This unique model ensures continuous value addition – turning transactional clients into strategic partners.',
      'Future Vision: By 2030, become the #1 outsourcing partner for emerging markets, powering 10,000+ SMEs with cutting-edge automation + human expertise.',
      'WorkHour Business – Where Global Ambition Meets Delhi Determination.',
    ],
  },
  { anchor: 'awards', heading: 'Awards' },
  { anchor: 'certifications', heading: 'Certifications' },
  {
    anchor: 'impact', heading: 'Our Impact', paragraphs: [
      'Since its inception in Delhi, WorkHour Business has created a profound global impact, empowering SMEs, entrepreneurs, and startups across India, Asia, Africa, and the Middle East to achieve sustainable growth through world-class Business Process Outsourcing services.',
      'From our Delhi headquarters, we’ve driven collective client revenue growth, created many direct jobs across the continents, and pioneered cross-border operations that helped businesses scale regionally—most notably enabling African startups to expand across multiple countries while GCC retailers penetrated digital markets.',
      'Our unique WorkHour Promise—allocating dedicated innovation time per client—has delivered 3.2x average ROI within 18 months, deployed tech stacks and GTM’s saving clients 65% in costs, and maintained a stellar 95% retention rate against the industry average of 75%. Beyond numbers, we’ve empowered women from Tier-2/3 cities, provided first corporate jobs to graduates—truly transforming Delhi’s entrepreneurial spirit into a continental economic force.',
    ],
  },
  {
    anchor: 'csr', heading: 'Corporate Social Responsibility', paragraphs: [
      'WorkHour Business is deeply committed to creating shared value beyond profits, channelling our Delhi roots into meaningful societal impact across the regions we serve. Our CSR initiatives focus on Women Empowerment, providing them stable corporate careers consulting and skill development in digital tools and customer service.',
      'We are bringing the “WorkHour Scholars” program sponsoring education for kids from low-income families, while our Africa Skill Bridge initiative will also provide free consulting and mentorship to entrepreneurs.',
      'Through these efforts, we will be impacting lives directly, embodying our belief that true business success measures not just revenue growth, but the communities we uplift along the way.',
    ],
  },
  {
    anchor: 'presence', heading: 'Presence', paragraphs: [
      'WorkHour Business identifies Delhi-NCR as its primary delivery hub and says it serves clients across time zones. The supplied documents list different regional locations; please see Global Presence for the combined list pending client confirmation.',
      'India – HQ + Primary Delivery: Delhi (HQ); Regional Centres: Bangalore, Mumbai, Chandigarh.',
      'Asia – Regional Centre: Malaysia.',
      'Africa – Regional Centres: Nairobi, Kenya; Malawi; Zimbabwe; South Africa; Ivory Coast; Rwanda; Ghana.',
      'The sitemap also names Australia, UAE, Canada, USA, and Mexico. Exact office and client-centre locations need confirmation.',
      'Our distributed delivery model ensures 24/7 coverage across multiple languages—from Hindi and Swahili to Arabic and Mandarin. Clients connect through our centralized Delhi dashboard while receiving localized support from regional delivery centres.',
      'Simple truth: One Delhi HQ, global reach. Your business gets world-class outsourcing with a single point of contact.',
    ],
    cta: { label: 'Explore Our Client Centers', url: '/global-presence' },
  },
]

const pageSeeds = [
  {
    title: 'About Workhour', slug: 'about', eyebrow: 'Workhour Business / Preview',
    introduction: 'Where global ambition meets Delhi determination.',
    body: 'Global expansion made simple, scalable, and risk-aware. Workhour Business supports international teams with local hiring, compliance, operational infrastructure, and strategic consulting.',
    sections: aboutSections,
  },
  {
    title: 'Join Delhi’s Global Outsourcing Powerhouse', slug: 'careers', eyebrow: 'Workhour Business / Careers',
    introduction: 'We’re always look out for passionate, customer-focused talent to power our 24/7 operations serving SMEs across India, Asia, Africa, and the Middle East.',
    body: 'WorkHour Business – Where freshers become global professionals.',
    sections: [
      { heading: 'Why WorkHour?', items: ['Real Growth', 'Global Exposure', 'Flexible Careers', 'Learning Culture', 'Competitive Pay'].map((title) => ({ title })) },
      { heading: 'What we Value', items: ['Positive Attitude', 'Team player', 'Willingness to learn', 'Communication'].map((title) => ({ title })) },
      { heading: 'Employee Benefits', items: ['Health insurance', 'Free certification courses', 'Performance incentives', 'Career progression'].map((title) => ({ title })) },
      { heading: 'Ready to grow with us?', cta: { label: 'Apply Now', url: 'mailto:careers@workhourbusiness.com' } },
    ],
  },
  {
    title: 'Contact Us', slug: 'contact', eyebrow: 'Workhour Business / Preview',
    introduction: 'A final contact destination is still to be supplied.',
    body: 'Address, phone, map, form fields, recipient, spam protection and success state are not provided. This preview does not submit contact forms.',
    sections: [{
      heading: 'Contact details', eyebrow: 'Workhour Business', paragraphs: ['Workhour Business'],
      items: [
        { title: 'Email', text: 'To be supplied' },
        { title: 'Phone', text: 'To be supplied' },
        { title: 'Office address', text: 'Delhi-NCR is identified as the primary delivery hub; the postal address is pending.' },
      ],
      cta: { label: 'View global presence', url: '/global-presence' },
    }],
  },
  {
    title: 'Global presence', slug: 'global-presence', eyebrow: 'Where we work',
    introduction: 'The country groupings below are provisional and pending client confirmation.',
    body: 'These are country groupings only; no office addresses or specific city locations are confirmed here.',
    sections: globalPresence.map(({ region, countries }) => ({
      anchor: `presence-${region.toLowerCase().replaceAll(' ', '-')}`,
      eyebrow: 'Region', heading: region, items: countries.map((title) => ({ title })),
    })),
  },
  {
    title: 'Make your next move work harder.', slug: 'services', eyebrow: 'Workhour Business / Services',
    introduction: 'Digital services shaped around your customers, content, and growth goals.',
    body: 'Website design, content animation, and SEO and marketing services.',
    sections: [],
  },
]

async function importMissing<T extends { slug: string }>(collection: 'pages' | 'services', seeds: T[]) {
  for (const data of seeds) {
    const existing = await payload.find({
      collection,
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: { slug: { equals: data.slug } },
    })
    if (existing.docs.length) {
      console.info(`Skipped ${collection}/${data.slug}: content already exists and was left unchanged.`)
      continue
    }
    const sections = (data as T & { sections?: Array<{ paragraphs?: unknown[] }> }).sections
    const normalized = sections
      ? {
          ...data,
          sections: sections.map((section) => ({
            ...section,
            paragraphs: section.paragraphs?.map((paragraph) => typeof paragraph === 'string' ? { text: paragraph } : paragraph),
          })),
        }
      : data
    await payload.create({
      collection,
      data: { ...normalized, _status: 'draft' } as never,
      overrideAccess: true,
    })
    console.info(`Created draft ${collection}/${data.slug}.`)
  }
}

const payload = await getPayload({ config })
try {
  await importMissing('pages', pageSeeds)
  const serviceSeeds = previewServices.map((service, index) => ({
    title: service.title,
    slug: service.slug,
    summary: service.description,
    introduction: service.intro,
    cta: { label: `Enquire about ${service.title}`, url: '/contact' },
    sections: service.sections.map((section, sectionIndex) => ({
      heading: section.title,
      body: section.text,
      sectionGroup: service.slug === 'content-animation'
        ? sectionIndex <= 4 ? 'enterprise' : sectionIndex <= 9 ? 'education' : 'process'
        : 'general',
    })),
    displayOrder: index + 1,
  }))
  await importMissing('services', serviceSeeds)
} finally {
  await payload.destroy()
}
process.exit(0)
