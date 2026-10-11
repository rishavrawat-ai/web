import { businesses } from './content'
import { businessContent } from './business-content'

export type BrandSite = {
  slug: string
  name: string
  strapline: string
  menuLabel: string
  includeReach: boolean
  services: string[]
  image: string
  mark: string
}

export const brandSites: BrandSite[] = [
  { slug: 'inceptura', name: 'Inceptura', strapline: 'Ideation to Execution', menuLabel: 'Offerings', includeReach: true, image: '/business-inceptura.webp', mark: 'IN', services: ['Company Registration & Compliance', 'Business Strategy & Growth Planning', 'Talent Acquisition', 'Event Management', 'Travel & Logistics', 'International Expansions', 'Revenue Checks & Performance Monitoring'] },
  { slug: 'employaa', name: 'Employaa', strapline: 'Recruitment and staffing', menuLabel: 'Services', includeReach: true, image: '/business-employaa.webp', mark: 'EM', services: ['Permanent Hiring', 'Contract Hiring', 'IT/Tech Staffing', 'RPO', 'Campus Hiring', 'Bulk Hiring', 'GIG / Industry Specific'] },
  { slug: 'remunerax', name: 'Remunerax', strapline: 'Payroll and workforce outsourcing', menuLabel: 'Services', includeReach: false, image: '/business-remunerax.webp', mark: 'RE', services: ['Payroll Processing', 'Statutory Compliances', 'Tax Management', 'Employee Self Service Portal', 'Full & Final Settlement', 'Support for Contractual'] },
  { slug: 'go-travel-global', name: 'Go Travel Global', strapline: 'Travel services', menuLabel: 'Services', includeReach: false, image: '/business-gotravel.webp', mark: 'GT', services: ['Visa Assistance & Documentation', 'Corporate & Business Travel', 'Domestic & Intl Tours', 'Customized Travel planning'] },
  { slug: 'elevatrain', name: 'Elevatrain', strapline: 'Corporate training and workshops', menuLabel: 'Trainings', includeReach: false, image: '/business-elevatrain.webp', mark: 'ET', services: ['Tech & Digital Skills', 'Dev Ops & Agile', 'Six Sigma & Process Excellence', 'Mindfulness', 'Project & Program Management', 'Communication & Soft Skills'] },
  { slug: 'thinkrunspace', name: 'ThinkRunSpace', strapline: 'Flexible workspace solutions', menuLabel: 'Offerings', includeReach: true, image: '/business-thinkrunspace.webp', mark: 'TR', services: ['Serviced & Managed offices', 'Co-Working Spaces', 'Virtual Office Solutions', 'Meeting Rooms & Business Infra'] },
  { slug: 'leaders-pinnacle', name: 'Leaders Pinnacle', strapline: 'B2B events and market intelligence', menuLabel: 'Services', includeReach: true, image: '/business-leaders-pinnacle.webp', mark: 'LP', services: ['Strategic Conferences', 'Trade Expos & Exhibitions', 'Bespoke Corporate Events', 'Webinars & Virtual Events', 'Podcast & Content Series'] },
]

export const brandHref = (brand: BrandSite) => `/brands/${brand.slug}`
export const serviceSlug = (title: string) => title.normalize('NFKD').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const getBrand = (slug: string) => brandSites.find((brand) => brand.slug === slug)
export const getBrandService = (brand: BrandSite, slug: string) => brand.services.find((title) => serviceSlug(title) === slug)

export function suppliedBrandSections(slug: string) {
  const business = businesses.find((item) => item.slug === slug)
  if (slug === 'leaders-pinnacle' || slug === 'elevatrain') {
    if (!business) return []
    return [{ title: 'Business overview', paragraphs: [business.intro, business.detail, ...(slug === 'leaders-pinnacle' ? business.sections ?? [] : [])] }]
  }
  const structured = businessContent[slug]
  if (structured) return structured
  if (!business) return []
  return [{ title: 'Business overview', paragraphs: [business.intro, business.detail, ...(business.sections ?? [])], bullets: business.bullets }]
}
