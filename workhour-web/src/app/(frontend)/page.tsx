import Image from 'next/image'
import React from 'react'
import './styles.css'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#071b33] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <Image
          priority
          alt="Workhour Business"
          className="mb-12 h-auto w-[min(420px,90vw)]"
          height={111}
          src="/workhour-business-logo.jpeg"
          width={534}
        />
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#42b8b0]">
          WorkHour Business
        </p>
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-white sm:text-7xl">
          Together We Thrive
        </h1>
      </section>
    </main>
  )
}
