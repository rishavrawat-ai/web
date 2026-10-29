export type PageVisual = { image: string; alt: string }

export const serviceVisuals: Record<string, PageVisual> = {
  'website-designing': { image: '/digital-design.webp', alt: 'Illustrative web designer developing a website layout in a creative studio' },
  'content-animation': { image: '/digital-motion.webp', alt: 'Illustrative motion designer working with three-dimensional forms in a design studio' },
  'seo-marketing': { image: '/digital-marketing.webp', alt: 'Illustrative marketing analysts reviewing campaign charts together' },
}

export const businessVisuals: Record<string, PageVisual> = {
  inceptura: { image: '/about-story-v2.webp', alt: 'Illustrative business specialists sharing ideas in a workplace' },
  employaa: { image: '/about-responsible-v2.webp', alt: 'Illustrative one-to-one professional conversation' },
  remunerax: { image: '/business-operations.webp', alt: 'Illustrative payroll administrator organizing everyday office work' },
  'go-travel-global': { image: '/business-travel.webp', alt: 'Illustrative business traveller walking through an airport' },
  elevatrain: { image: '/business-learning.webp', alt: 'Illustrative professional skills workshop with participants working on laptops' },
  thinkrunspace: { image: '/business-thinkrunspace.webp', alt: 'Illustrative flexible workspace with shared and individual work areas' },
  'leaders-pinnacle': { image: '/ignitia-connections.webp', alt: 'Illustrative professionals exchanging ideas at a conference' },
}

export const pageVisuals: Record<string, PageVisual> = {
  about: { image: '/about-story-v2.webp', alt: 'Illustrative colleagues in a contemporary workspace' },
  businesses: { image: '/about-story-v2.webp', alt: 'Illustrative specialists collaborating across business disciplines' },
  announcements: { image: '/ignitia-auditorium.webp', alt: 'Illustrative speaker and audience at a business gathering' },
  careers: { image: '/business-learning.webp', alt: 'Illustrative colleagues developing professional skills together' },
  contact: { image: '/about-responsible-v2.webp', alt: 'Illustrative professionals discussing their business needs' },
  'news-media': { image: '/ignitia-connections.webp', alt: 'Illustrative exchange of ideas between business professionals' },
  'global-presence': { image: '/about-presence-v2.webp', alt: 'Illustrative airport scene representing business travel across regions' },
}

export function brandServiceVisual(brand: string, title: string): PageVisual {
  if (/self service portal/i.test(title)) return serviceVisuals['website-designing']
  if (/statutory/i.test(title)) return { image: '/business-remunerax.webp', alt: 'Illustrative administrator reviewing workforce records in an office' }
  if (/settlement|contractual/i.test(title)) return businessVisuals.employaa
  if (/travel|visa|tours|international expansions/i.test(title)) return businessVisuals['go-travel-global']
  if (/payroll|tax|statutory|settlement|compliance|registration|contractual/i.test(title)) return businessVisuals.remunerax
  if (/talent|hiring|staffing|rpo|campus|gig/i.test(title)) return businessVisuals.employaa
  if (/webinar|podcast|content series/i.test(title)) return serviceVisuals['content-animation']
  if (/event|conference|expo/i.test(title)) return businessVisuals['leaders-pinnacle']
  if (/technology|tech &|digital|dev ops/i.test(title)) return serviceVisuals['website-designing']
  if (/revenue|performance monitoring/i.test(title)) return serviceVisuals['seo-marketing']
  return businessVisuals[brand] ?? pageVisuals.businesses
}
