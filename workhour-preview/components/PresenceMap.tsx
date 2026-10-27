'use client'

import { useMemo, useState } from 'react'
import mapCountries from '../data/world-map-paths.json'
import { presenceCountries } from '../data/presence-countries'
import styles from './PresenceMap.module.css'

type MapCountry = { code: string; name: string; path: string }
type PresenceMapProps = { variant?: 'full' | 'compact' }

const planningNote = 'Provisional planning reference. It does not confirm an office or local service availability.'

export default function PresenceMap({ variant = 'full' }: PresenceMapProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const selectedCountry = presenceCountries.find(({ code }) => code === selectedCode)
  const regions = useMemo(() => Array.from(new Set(presenceCountries.map(({ region }) => region))), [])
  const highlightedCodes = useMemo(() => new Set(presenceCountries.map(({ code }) => code)), [])

  return <section className={`${styles.map} ${variant === 'compact' ? styles.compact : styles.full}`} aria-label="World map and provisional country list">
    <div className={styles.visual}>
      <svg className={styles.worldSvg} viewBox="0 0 960 480" role="group" aria-labelledby="world-map-title world-map-description">
        <title id="world-map-title">Countries named in Workhour Business planning material</title>
        <desc id="world-map-description">An equirectangular map with ten highlighted countries. The highlighted countries are provisional planning references, not confirmed offices or service territories.</desc>
        <g className="presence-map-land">
          {(mapCountries as MapCountry[]).map(({ code, name, path }) => {
            const country = presenceCountries.find((entry) => entry.code === code)
            const highlighted = highlightedCodes.has(code)
            return <path
              key={`${code}-${name}`}
              d={path}
              className={`${styles.countryShape} ${highlighted ? styles.countryHighlight : styles.countryBase} ${selectedCode === code ? styles.selected : ''}`}
              aria-hidden={!highlighted}
              role={highlighted ? 'button' : undefined}
              tabIndex={highlighted ? 0 : undefined}
              aria-label={highlighted && country ? `${country.name}. ${planningNote}` : undefined}
              aria-pressed={highlighted ? selectedCode === code : undefined}
              onFocus={highlighted ? () => setSelectedCode(code) : undefined}
              onPointerEnter={highlighted ? () => setSelectedCode(code) : undefined}
              onClick={highlighted ? () => setSelectedCode(code) : undefined}
            />
          })}
        </g>
      </svg>
      <div className={styles.key}><span aria-hidden="true" /> Countries in the planning list · provisional</div>
      <p className={styles.tooltip} role="status" aria-live="polite">
        {selectedCountry ? <><strong>{selectedCountry.name}</strong><span>{planningNote}</span></> : 'Focus, hover, or tap a highlighted country to see its status.'}
      </p>
    </div>
    <div className={styles.countryList}>
      <div className={styles.listHeading}><p className="eyebrow teal">Provisional planning references</p><h3>Countries named in the supplied material</h3></div>
      {regions.map((region) => <div className={styles.region} key={region}>
        <h4>{region}</h4>
        <ul>{presenceCountries.filter((country) => country.region === region).map((country) => <li key={country.code}>
          <button className={styles.countryButton} type="button" aria-pressed={selectedCode === country.code} onFocus={() => setSelectedCode(country.code)} onClick={() => setSelectedCode(country.code)}>
            <span>{country.name}</span><small>Provisional</small>
          </button>
        </li>)}</ul>
      </div>)}
      <p className={styles.disclaimer}>These planning references do not confirm an office, address, or active service availability in any country.</p>
    </div>
  </section>
}
