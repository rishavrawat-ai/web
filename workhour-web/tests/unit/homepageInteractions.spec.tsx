import { act, type ReactElement, type AnchorHTMLAttributes, type ImgHTMLAttributes } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BusinessShowcase } from '../../src/components/homepage/BusinessShowcase'
import { HeroCarousel } from '../../src/components/homepage/HeroCarousel'
import type { HomepageBusiness } from '../../src/components/homepage/types'

vi.mock('next/image', () => ({
  default: ({ alt }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; sizes?: string }) => (
    <span role="img" aria-label={alt} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
}))

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

function render(element: ReactElement) {
  act(() => root.render(element))
}

describe('homepage interactions', () => {
  it('moves between Payload hero slides using the controls', () => {
    render(
      <HeroCarousel
        slides={[
          { id: 'one', headline: 'First slide', ctaLabel: 'Explore' },
          { id: 'two', headline: 'Second slide', ctaLabel: 'Explore' },
        ]}
      />,
    )

    expect(container.querySelector('h1')?.textContent).toBe('First slide')
    const nextButton = container.querySelector<HTMLButtonElement>('button[aria-label="Next slide"]')
    expect(nextButton).toBeTruthy()
    act(() => nextButton?.click())
    expect(container.querySelector('h1')?.textContent).toBe('Second slide')
    const previousButton = container.querySelector<HTMLButtonElement>('button[aria-label="Previous slide"]')
    act(() => previousButton?.click())
    expect(container.querySelector('h1')?.textContent).toBe('First slide')
  })

  it('switches business tabs and supports arrow-key navigation', () => {
    const businesses: HomepageBusiness[] = [
      {
        id: 1,
        slug: 'one',
        name: 'First business',
        homepageIntroduction: 'First summary',
        displayOrder: 1,
        updatedAt: '',
        createdAt: '',
        _status: 'published',
      },
      {
        id: 2,
        slug: 'two',
        name: 'Second business',
        homepageIntroduction: 'Second summary',
        displayOrder: 2,
        updatedAt: '',
        createdAt: '',
        _status: 'published',
      },
    ]

    render(<BusinessShowcase businesses={businesses} />)

    const tabs = () => container.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    expect(tabs()[0]?.getAttribute('aria-selected')).toBe('true')
    act(() => tabs()[1]?.click())
    expect(tabs()[1]?.getAttribute('aria-selected')).toBe('true')
    expect(container.querySelector('[role="tabpanel"]')?.textContent).toContain('Second summary')

    act(() => {
      tabs()[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
      tabs()[1]?.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft', bubbles: true }))
    })
    expect(tabs()[0]?.getAttribute('aria-selected')).toBe('true')
  })
})
