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
  { slug: 'inceptura', name: 'Inceptura', strapline: 'Ideation to Execution', menuLabel: 'Offerings', includeReach: true, image: '/business-inceptura.webp', mark: 'IN' , services: ['Company Registration & Compliance', 'Business Strategy & Growth Planning', 'Talent Acquisition', 'Event Management', 'Travel & Logistics', 'International Expansions', 'Revenue Checks & Performance Monitoring'] },
  { slug: 'employaa', name: 'Employaa', strapline: 'Recruitment and staffing', menuLabel: 'Services', includeReach: true, image: '/business-employaa.webp', mark: 'EM', services: ['Permanent Hiring', 'Contract Hiring', 'IT/Tech Staffing', 'RPO', 'Campus Hiring', 'Bulk Hiring', 'GIG / Industry Specific'] },
  { slug: 'remunerax', name: 'Remunerax', strapline: 'Payroll and workforce outsourcing', menuLabel: 'Services', includeReach: false, image: '/business-remunerax.webp', mark: 'RE', services: ['Payroll Processing', 'Statutory Compliances', 'Tax Management', 'Employee Self Service Portal', 'Full & Final Settlement', 'Support for Contractual'] },
  { slug: 'go-travel-global', name: 'Go Travel Global', strapline: 'Travel services', menuLabel: 'Services', includeReach: false, image: '/business-gotravel.webp', mark: 'GT', services: ['Visa Assistance & Documentation', 'Corporate & Business Travel', 'Domestic & Intl Tours', 'Customized Travel planning'] },
  { slug: 'elevatrain', name: 'Elevatrain', strapline: 'Corporate training and workshops', menuLabel: 'Trainings', includeReach: false, image: '/business-elevatrain.webp', mark: 'ET', services: ['Tech & Digital Skills', 'Dev Ops & Agile', 'Six Sigma & Process Excellence', 'Mindfulness', 'Project & Program Management', 'Communication & Soft Skills'] },
  { slug: 'thinkrunspace', name: 'ThinkRunSpace', strapline: 'Flexible workspace solutions', menuLabel: 'Offerings', includeReach: true, image: '/business-thinkrunspace.webp', mark: 'TR', services: ['Serviced & Managed offices', 'Co-Working Spaces', 'Virtual Office Solutions', 'Meeting Rooms & Business Infra'] },
  { slug: 'leaders-pinnacle', name: 'Leaders Pinnacle', strapline: 'B2B events and market intelligence', menuLabel: 'Services', includeReach: true, image: '/business-leaders-pinnacle.webp', mark: 'LP', services: ['Strategic Conferences', 'Trade Expos & Exhibitions', 'Bespoke Corporate Events', 'Webinars & Virtual Events', 'Podcast & Content Series'] },
]

// Draft editorial descriptions inferred only from client-supplied service titles.
// The site labels these as proposals pending client approval.
export const proposedBrandServiceDescriptions: Record<string, Record<string, string>> = {
  inceptura: {
    'Company Registration & Compliance': 'Proposed support with setting up a company and organizing its compliance requirements. Jurisdictions, deliverables, and legal responsibilities need client confirmation.',
    'Business Strategy & Growth Planning': 'Proposed planning support to clarify business priorities, goals, and growth steps. The planning format and scope need client confirmation.',
    'Talent Acquisition': 'Proposed assistance defining hiring needs and coordinating candidate sourcing and selection. Roles, markets, and recruiting responsibilities need client confirmation.',
    'Event Management': 'Proposed planning and coordination support for business events. Event formats, locations, and included services need client confirmation.',
    'Travel & Logistics': 'Proposed coordination of business travel and related logistics. Destinations and included arrangements need client confirmation.',
    'International Expansions': 'Proposed planning support for entering additional markets. Target markets and any implementation work need client confirmation.',
    'Revenue Checks & Performance Monitoring': 'Proposed review of revenue information and business performance indicators. Data, measures, and reporting cadence need client confirmation.',
  },
  employaa: {
    'Permanent Hiring': 'Proposed recruitment support for permanent roles, from clarifying role requirements through candidate selection. Role levels, markets, and delivery responsibilities need client confirmation.',
    'Contract Hiring': 'Proposed coordination of recruitment for contract roles. Contract terms, role coverage, and the division of responsibilities need client confirmation.',
    'IT/Tech Staffing': 'Proposed recruitment support for technology and IT roles. Role families, required skills, markets, and engagement terms need client confirmation.',
    RPO: 'Proposed outsourcing support for agreed parts of an organisation’s recruitment process. The activities covered and operating model need client confirmation.',
    'Campus Hiring': 'Proposed coordination of recruitment activity connected with educational campuses and early-career candidates. Participating institutions and scope need client confirmation.',
    'Bulk Hiring': 'Proposed coordination for hiring across multiple roles or positions. Hiring volumes, timelines, and selection responsibilities need client confirmation.',
    'GIG / Industry Specific': 'Proposed recruitment support for gig or industry-specific roles. Role classifications, target sectors, and engagement terms need client confirmation.',
  },
  remunerax: {
    'Payroll Processing': 'Proposed support preparing and administering payroll calculations and pay-cycle records from client-approved inputs. Coverage, schedules, and applicable requirements need confirmation.',
    'Statutory Compliances': 'Proposed assistance organizing recurring statutory compliance tasks and records for review against applicable requirements. Jurisdictions and responsibilities need confirmation.',
    'Tax Management': 'Proposed support coordinating tax-related calculations, documentation, and timelines for an agreed workforce context. Coverage and responsibilities need confirmation.',
    'Employee Self Service Portal': 'Proposed employee self-service offering for accessing selected employee information or submitting requests. Available functions and any technology scope need client confirmation.',
    'Full & Final Settlement': 'Proposed support coordinating final-pay calculations and settlement documentation when employment concludes. Policies, timelines, and local requirements need confirmation.',
    'Support for Contractual': 'Proposed administrative support for contractual workforce arrangements. Included services, worker categories, and responsibilities need client confirmation.',
  },
  'go-travel-global': {
    'Visa Assistance & Documentation': 'Proposed assistance preparing and organizing visa-related documentation. Destinations, applicant requirements, and the limits of assistance need client confirmation.',
    'Corporate & Business Travel': 'Proposed planning and coordination support for corporate and business travel. Covered arrangements, destinations, and service terms need client confirmation.',
    'Domestic & Intl Tours': 'Proposed planning support for domestic and international tours. Destinations, itinerary options, inclusions, and availability need client confirmation.',
    'Customized Travel planning': 'Proposed travel planning shaped around a traveller’s stated preferences and trip requirements. Available options and included services need client confirmation.',
  },
  elevatrain: {
    'Tech & Digital Skills': 'Proposed learning and training content covering technology and digital skills. Topics, participant levels, and delivery format need client confirmation.',
    'Dev Ops & Agile': 'Proposed training content covering DevOps and Agile practices. Curriculum, intended audience, and delivery format need client confirmation.',
    'Six Sigma & Process Excellence': 'Proposed training content covering Six Sigma and process-excellence topics. Course scope, levels, and any certification arrangements need client confirmation.',
    Mindfulness: 'Proposed mindfulness learning sessions or content. Intended audience, format, and scope need client confirmation.',
    'Project & Program Management': 'Proposed training content covering project and program management. Topics, participant levels, and delivery format need client confirmation.',
    'Communication & Soft Skills': 'Proposed learning content covering communication and other soft skills. Topics, intended audience, and delivery format need client confirmation.',
  },
  thinkrunspace: {
    'Serviced & Managed offices': 'Proposed serviced or managed office options for business use. Locations, facilities, availability, and terms need client confirmation.',
    'Co-Working Spaces': 'Proposed coworking space options for individuals or teams. Locations, access arrangements, facilities, and terms need client confirmation.',
    'Virtual Office Solutions': 'Proposed virtual office support for agreed business needs. Included services, permitted uses, and applicable locations need client confirmation.',
    'Meeting Rooms & Business Infra': 'Proposed meeting-room and business-infrastructure options. Locations, equipment, booking arrangements, and terms need client confirmation.',
  },
  'leaders-pinnacle': {
    'Strategic Conferences': 'Proposed planning and coordination for business conferences around agreed themes, audiences, and objectives. Event scope and locations need client confirmation.',
    'Trade Expos & Exhibitions': 'Proposed planning and coordination support for trade expos and exhibitions. Event formats, markets, and included services need client confirmation.',
    'Bespoke Corporate Events': 'Proposed planning support for corporate events shaped around client requirements. Event formats, production scope, and locations need client confirmation.',
    'Webinars & Virtual Events': 'Proposed planning and coordination for webinars and virtual events. Platforms, production responsibilities, and event scope need client confirmation.',
    'Podcast & Content Series': 'Proposed planning support for podcasts and content series. Format, production scope, and publishing responsibilities need client confirmation.',
  },
}

export const brandHref = (brand: BrandSite) => `/brands/${brand.slug}`
export const serviceSlug = (title: string) => title.normalize('NFKD').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const getBrand = (slug: string) => brandSites.find((brand) => brand.slug === slug)
export const getBrandService = (brand: BrandSite, slug: string) => brand.services.find((title) => serviceSlug(title) === slug)

export function suppliedBrandSections(slug: string) {
  const structured = businessContent[slug]
  if (structured) return structured
  const business = businesses.find((item) => item.slug === slug)
  if (!business) return []
  return [
    { title: 'Business overview', paragraphs: [business.intro, business.detail, ...(business.sections ?? [])], bullets: business.bullets },
  ]
}
