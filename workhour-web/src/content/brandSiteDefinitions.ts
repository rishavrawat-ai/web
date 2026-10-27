export type BrandSiteDefinition = {
  businessSlug: string
  serviceMenuLabel: string
  showGlobalReach: boolean
  serviceTitles: readonly string[]
}

export const brandSiteDefinitions: readonly BrandSiteDefinition[] = [
  {
    businessSlug: 'inceptura',
    serviceMenuLabel: 'Offerings',
    showGlobalReach: true,
    serviceTitles: [
      'Company Registration & Compliance',
      'Business Strategy & Growth Planning',
      'Talent Acquisition',
      'Event Management',
      'Travel & Logistics',
      'International Expansions',
      'Revenue Checks & Performance Monitoring',
    ],
  },
  {
    businessSlug: 'employaa',
    serviceMenuLabel: 'Services',
    showGlobalReach: true,
    serviceTitles: [],
  },
  {
    businessSlug: 'remunerax',
    serviceMenuLabel: 'Services',
    showGlobalReach: false,
    serviceTitles: [
      'Payroll Processing',
      'Statutory Compliances',
      'Tax Management',
      'Employee Self Service Portal',
      'Full & Final Settlement',
      'Support for Contractual',
    ],
  },
  {
    businessSlug: 'gotravelglobal',
    serviceMenuLabel: 'Services',
    showGlobalReach: false,
    serviceTitles: [
      'Visa Assistance & Documentation',
      'Corporate & Business Travel',
      'Domestic & Intl Tours',
      'Customized Travel planning',
    ],
  },
  {
    businessSlug: 'elevatrain',
    serviceMenuLabel: 'Trainings',
    showGlobalReach: false,
    serviceTitles: [
      'Tech & Digital Skills',
      'Dev Ops & Agile',
      'Six Sigma & Process Excellence',
      'Mindfulness',
      'Project & Program Management',
      'Communication & Soft Skills',
    ],
  },
  {
    businessSlug: 'thinkrunspace',
    serviceMenuLabel: 'Offerings',
    showGlobalReach: true,
    serviceTitles: [
      'Serviced & Managed offices',
      'Co-Working Spaces',
      'Virtual Office Solutions',
      'Meeting Rooms & Business Infra',
    ],
  },
  {
    businessSlug: 'leaderspinnacle',
    serviceMenuLabel: 'Services',
    showGlobalReach: true,
    serviceTitles: [
      'Strategic Conferences',
      'Trade Expos & Exhibitions',
      'Bespoke Corporate Events',
      'Webinars & Virtual Events',
      'Podcast & Content Series',
    ],
  },
]

export function getBrandSiteDefinition(businessSlug: string): BrandSiteDefinition {
  return brandSiteDefinitions.find(({ businessSlug: slug }) => slug === businessSlug) ?? {
    businessSlug,
    serviceMenuLabel: 'Services',
    showGlobalReach: false,
    serviceTitles: [],
  }
}
