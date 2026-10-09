import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Workhour Business — Together We Thrive.',
  title: 'Workhour Business',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
