import type { ReactNode } from 'react'

export type VisualIconName =
  | 'strategy' | 'people' | 'payroll' | 'travel' | 'learning' | 'workspace' | 'events'
  | 'resilience' | 'innovation' | 'legacy' | 'web' | 'motion' | 'growth'
  | 'audience' | 'scope' | 'process' | 'benefit' | 'service'

const artwork: Record<VisualIconName, ReactNode> = {
  strategy: <><path d="M20 42 39 23l13 13 26-26"/><path d="M62 10h16v16"/><circle cx="20" cy="42" r="5"/><circle cx="39" cy="23" r="5"/><circle cx="52" cy="36" r="5"/><circle cx="78" cy="10" r="5"/></>,
  people: <><circle cx="50" cy="27" r="11"/><circle cx="24" cy="33" r="8"/><circle cx="76" cy="33" r="8"/><path d="M29 75c1-14 9-22 21-22s20 8 21 22M8 72c1-11 7-17 16-17 5 0 9 2 12 6M92 72c-1-11-7-17-16-17-5 0-9 2-12 6"/></>,
  payroll: <><rect x="19" y="12" width="62" height="76" rx="7"/><path d="M33 31h34M33 45h22M33 65l10 9 19-20"/><circle cx="71" cy="65" r="13"/></>,
  travel: <><path d="m12 54 34-8-21-24 8-5 31 24 20-5c5-1 8 2 7 6L90 54 62 63 47 84l-7 1 6-21-27 8-7-5Z"/></>,
  learning: <><path d="M50 23c-12-9-26-9-38-3v51c12-6 26-6 38 3 12-9 26-9 38-3V20c-12-6-26-6-38 3Z"/><path d="M50 24v50M23 34h15m-15 12h15m24-12h15m-15 12h15"/></>,
  workspace: <><path d="M17 86V20h66v66M8 86h84M30 34h13v13H30zm27 0h13v13H57zM30 59h13v13H30zm27 0h13v27H57z"/></>,
  events: <><rect x="15" y="20" width="70" height="63" rx="5"/><path d="M15 38h70M31 11v18m38-18v18M30 54h12m12 0h12M30 67h12m12 0h12"/><circle cx="72" cy="65" r="10"/></>,
  resilience: <><path d="M50 12 79 23v22c0 18-12 30-29 41-17-11-29-23-29-41V23Z"/><path d="m34 49 11 11 22-24"/></>,
  innovation: <><path d="M36 65c0-8-12-14-12-30a26 26 0 1 1 52 0c0 16-12 22-12 30ZM38 75h24m-20 9h16"/><path d="M50 2v8m-34 2 7 7m54-7-7 7M7 37h10m66 0h10"/></>,
  legacy: <><path d="M14 82h72M20 75V43h14v32m9 0V29h14v46m9 0V17h14v58"/><path d="m16 34 22-18 16 9L81 8"/><path d="M68 8h13v13"/></>,
  web: <><rect x="11" y="16" width="78" height="59" rx="5"/><path d="M11 31h78M40 88h20M50 75v13M20 24h1m8 0h1m8 0h1"/></>,
  motion: <><circle cx="50" cy="50" r="9"/><path d="M50 14c10 14 10 58 0 72M14 50c14-10 58-10 72 0M25 25c19 2 48 31 50 50M75 25c-2 19-31 48-50 50"/></>,
  growth: <><path d="M16 78h68M24 68l17-19 14 11 24-31"/><path d="M62 29h17v17"/><circle cx="24" cy="68" r="4"/><circle cx="41" cy="49" r="4"/><circle cx="55" cy="60" r="4"/></>,
  audience: <><circle cx="50" cy="31" r="14"/><path d="M21 83c2-18 12-28 29-28s27 10 29 28M13 22h10m-5-5v10m54-5h10m-5-5v10"/></>,
  scope: <><path d="M17 24h66v54H17zM29 39h42M29 51h31M29 63h24"/><path d="m70 65 7 7 13-16"/></>,
  process: <><path d="M50 14a36 36 0 0 1 34 24M84 38V18m0 20H64M50 86a36 36 0 0 1-34-24M16 62v20m0-20h20"/><path d="M50 30v21l15 9"/></>,
  benefit: <><path d="m50 10 10 25 27 2-21 17 7 26-23-14-23 14 7-26-21-17 27-2Z"/></>,
  service: <><path d="M18 20h64v64H18zM31 36h38M31 50h38M31 64h24"/><circle cx="75" cy="74" r="13"/><path d="m70 74 4 4 7-9"/></>,
}

export default function VisualIcon({ name, className }: { name: VisualIconName; className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{artwork[name]}</svg>
}

export function getServiceIcon(label: string): VisualIconName {
  const value = label.toLowerCase()
  if (/co.?working/.test(value)) return 'people'
  if (/meeting room/.test(value)) return 'events'
  if (/virtual office/.test(value)) return 'web'
  if (/compliance|registration/.test(value)) return 'scope'
  if (/travel|visa|tour|logistic/.test(value)) return 'travel'
  if (/recruit|hiring|talent|people|campus|staff|rpo/.test(value)) return 'people'
  if (/payroll|tax|revenue|settlement/.test(value)) return 'payroll'
  if (/workspace|office|cowork|infra/.test(value)) return 'workspace'
  if (/train|skill|mindful|communication|agile|project|learning/.test(value)) return 'learning'
  if (/event|webinar|conference|expo|podcast|exhibition/.test(value)) return 'events'
  if (/website|design|e-commerce|mobile|ux/.test(value)) return 'web'
  if (/animation|motion|video|visual|content/.test(value)) return 'motion'
  if (/marketing|seo|growth|strategy|expansion|business/.test(value)) return 'growth'
  return 'service'
}
