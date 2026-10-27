import type { VisualIconName } from '../components/VisualIcon'

export type AboutSection = {
  slug: string
  label: string
  title: string
  accent: string
  intro: string
  image: string
  alt: string
  heading: string
  paragraphs: string[]
  pillars: { title: string; text: string; icon: VisualIconName }[]
}

export const aboutSections: AboutSection[] = [
  {
    slug: 'our-story', label: 'Our Story', title: 'Specialist strengths.', accent: 'Shared ambition.',
    intro: 'Workhour Business brings together specialist services that support organizations from early planning through day-to-day operations and growth.',
    image: '/about-story-v2.webp', alt: 'Illustrative specialists walking and talking in a contemporary shared workspace',
    heading: 'One group. Seven specialist businesses.',
    paragraphs: [
      'Workhour Business brings together seven specialist businesses: Inceptura, Employaa, Remunerax, Go Travel Global, Elevatrain, ThinkRunSpace, and Leaders Pinnacle.',
      'Together, their service areas span business planning, recruitment, payroll administration, travel, corporate learning, flexible workspaces, and professional events.',
    ],
    pillars: [],
  },
  {
    slug: 'our-impact', label: 'Our Impact', title: 'Focused expertise.', accent: 'Practical progress.',
    intro: 'Connecting organizations with the right capabilities at each stage of the business journey.',
    image: '/about-impact-v2.webp', alt: 'Illustrative corporate learning workshop with a facilitator and participants',
    heading: 'Making complex needs easier to navigate.',
    paragraphs: [
      'Our aim is to make complex business needs easier to navigate by connecting organizations with focused expertise across the business journey.',
      'Each brand concentrates on a distinct area of work, so organizations can explore the support relevant to their current priorities.',
    ],
    pillars: [
      { title: 'Plan the next step', text: 'Business planning and focused expertise help organizations consider their priorities and direction.', icon: 'strategy' },
      { title: 'Support everyday work', text: 'People, payroll, travel, and workspace services address the practical needs of running a business.', icon: 'people' },
      { title: 'Create room to grow', text: 'Learning and professional events help organizations explore skills, ideas, and connections.', icon: 'growth' },
    ],
  },
  {
    slug: 'responsible-business', label: 'Responsible Business', title: 'Thoughtful decisions.', accent: 'Responsible work.',
    intro: 'Clear expectations, thoughtful planning, and respect for the people behind every business decision.',
    image: '/about-responsible-v2.webp', alt: 'Illustrative colleagues in an attentive one-to-one workplace conversation',
    heading: 'Responsibility begins with how we work.',
    paragraphs: [
      'Responsible work begins with clear expectations, thoughtful planning, and respect for the people affected by business decisions.',
      'We approach each service with attention to its context and encourage clients to define the outcomes, responsibilities, and safeguards that matter to them.',
    ],
    pillars: [
      { title: 'Clear expectations', text: 'Define the outcomes and responsibilities that matter to the work, from the beginning.', icon: 'scope' },
      { title: 'Thoughtful planning', text: 'Consider the context of each service and the safeguards relevant to it.', icon: 'process' },
      { title: 'Respect for people', text: 'Keep the people affected by business decisions in view throughout the process.', icon: 'people' },
    ],
  },
  {
    slug: 'presence', label: 'Presence', title: 'A wider perspective.', accent: 'A connected world.',
    intro: 'Explore the regional market context behind the Workhour Business planning material.',
    image: '/about-presence-v2.webp', alt: 'Illustrative business traveller in a contemporary airport concourse',
    heading: 'Looking across regions and opportunities.',
    paragraphs: [
      'The supplied planning material names markets across Asia, Oceania, the Middle East, Africa, and North America.',
      'These are planning references, not a directory of confirmed offices or service locations.',
    ],
    pillars: [],
  },
]

export const getAboutSection = (slug: string) => aboutSections.find(section => section.slug === slug)

