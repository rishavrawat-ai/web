import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Workhour Business — Together We Thrive', template: '%s | Workhour Business' },
  description: 'Business services across planning, people, payroll, travel, learning, workspaces, events, and digital marketing.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
