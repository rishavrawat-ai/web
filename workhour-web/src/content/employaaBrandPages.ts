export type EmployaaImportPage = {
  title: string
  slug: string
  pageType: 'page' | 'service'
  displayOrder: number
  eyebrow?: string
  summary?: string
  introduction?: string
  sections?: Array<{
    heading: string
    body?: string
    paragraphs?: string[]
    items?: Array<{ title: string; text?: string }>
  }>
}

const overview = 'Employaa is a specialized recruitment and staffing partner focused on delivering end-to-end talent solutions for organizations across industries.'

export const employaaBrandPages: EmployaaImportPage[] = [
  {
    title: 'Employaa', slug: 'home', pageType: 'page', displayOrder: 0, eyebrow: 'Recruitment and staffing',
    summary: overview,
    introduction: 'We support clients with both permanent recruitment and outsourced staffing models, covering roles from entry-level to senior leadership and CXO positions. Our strength lies in a seasoned team of recruiters, structured processes, and a commitment to speed, quality, and cultural fit.',
    sections: [
      { heading: 'Recruitment market context', paragraphs: [
        'The recruitment and staffing industry continues to expand, driven by factors such as increased specialization of roles, rapid business growth cycles, and the rising preference for flexible workforce models. Companies are increasingly outsourcing recruitment and staffing functions to specialized partners to gain access to wider talent pools, reduce hiring timelines, and ensure compliance with labor regulations.',
        'Outsourced staffing solutions are particularly attractive to organizations that need to manage headcount flexibility, control fixed costs, and navigate complex regulatory requirements for short-term or project-based employees.',
      ] },
    ],
  },
  {
    title: 'About Employaa', slug: 'about', pageType: 'page', displayOrder: 1,
    sections: [
      { heading: 'Recruitment and staffing solutions', paragraphs: [
        'Employaa’s service portfolio includes direct hiring (recruit-only) and full-service staffing on Employaa’s payroll. This dual-model approach enables client organizations to flexibly scale their workforce while optimizing costs, mitigating compliance risks, and reducing time-to-hire.',
        'Employaa partners with multiple organizations to source, assess, and onboard talent across a wide range of functions and experience levels. The company operates with a professional delivery model driven by experienced recruiters, standardized processes, and strong client relationships.',
      ] },
      { heading: 'Key attributes of Employaa’s positioning', items: [
        { title: 'Coverage of roles', text: 'From junior, mid-level, managerial to CXO and leadership positions.' },
        { title: 'Flexible engagement models', text: 'Recruit-only and full outsourced staffing on Employaa’s payroll.' },
        { title: 'Sector-agnostic approach', text: 'Capacity to serve multiple industries.' },
        { title: 'Delivery focus', text: 'Speed, accuracy of profiles, and long-term client partnerships.' },
      ] },
      { heading: 'Brand identity', paragraphs: [
        'The brand identity for Employaa is designed to reflect professionalism, reliability, and modern HR expertise. Clean typography and a corporate colour palette reinforce trust and simplicity, supporting both digital and print communication materials.',
      ] },
    ],
  },
  {
    title: 'Services', slug: 'services', pageType: 'page', displayOrder: 2,
    introduction: 'Employaa’s service portfolio includes direct hiring (recruit-only) and full-service staffing on Employaa’s payroll. This dual-model approach enables client organizations to flexibly scale their workforce while optimizing costs, mitigating compliance risks, and reducing time-to-hire.',
  },
  { title: 'Contact', slug: 'contact', pageType: 'page', displayOrder: 3 },
  { title: 'Our Global Reach', slug: 'global-reach', pageType: 'page', displayOrder: 4 },
  { title: 'Permanent Hiring', slug: 'permanent-hiring', pageType: 'service', displayOrder: 10 },
  { title: 'Contract Hiring', slug: 'contract-hiring', pageType: 'service', displayOrder: 11 },
  { title: 'IT/Tech Staffing', slug: 'it-tech-staffing', pageType: 'service', displayOrder: 12 },
  { title: 'RPO', slug: 'rpo', pageType: 'service', displayOrder: 13 },
  { title: 'Campus Hiring', slug: 'campus-hiring', pageType: 'service', displayOrder: 14 },
  { title: 'Bulk Hiring', slug: 'bulk-hiring', pageType: 'service', displayOrder: 15 },
  { title: 'GIG / Industry Specific', slug: 'gig-industry-specific', pageType: 'service', displayOrder: 16 },
]
