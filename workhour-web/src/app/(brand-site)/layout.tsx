import type { ReactNode } from 'react'
import '../(frontend)/styles.css'
import './brand.css'

export default function BrandRootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body className="brand-site-document">{children}</body></html>
}
