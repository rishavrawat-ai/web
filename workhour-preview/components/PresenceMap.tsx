'use client'

import { useMemo, useState } from 'react'
import mapCountries from '../data/world-map-paths.json'
import { presenceCountries } from '../data/presence-countries'
import styles from './PresenceMap.module.css'

type MapCountry = { code: string; name: string; path: string }
type PresenceMapProps = { variant?: 'full' | 'compact' }

// Approximate country locations, matching the map's equirectangular projection.
const pinLocations: Record<string, [number, number]> = {
  IND: [77.209, 28.614], MYS: [102, 4], AUS: [134, -25], ARE: [54, 24],
  KEN: [38, 1], ZWE: [30, -19], MWI: [34, -13], RWA: [30, -2],
  CAN: [-106, 57], MEX: [-102, 24],
}

export default function PresenceMap({ variant = 'full' }: PresenceMapProps) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const selectedCountry = presenceCountries.find(({ code }) => code === selectedCode)
  const regions = useMemo(() => Array.from(new Set(presenceCountries.map(({ region }) => region))), [])

  return <section className={`${styles.map} ${variant === 'compact' ? styles.compact : styles.full}`} aria-label="World map and country list">
    <div className={styles.visual}>
      <div className={styles.mapCanvas}><svg className={styles.worldSvg} viewBox="0 0 960 480" role="group" aria-labelledby="world-map-title world-map-description">
        <title id="world-map-title">Countries named in Workhour Business planning material</title>
        <desc id="world-map-description">An equirectangular map with ten country pins. The larger pin marks New Delhi, India - Head Quarters. Hover, focus, or tap a pin to see the country name.</desc>
        <g className="presence-map-land">
          {(mapCountries as MapCountry[]).map(({ code, name, path }) => <path key={code + name} d={path} className={styles.countryShape + ' ' + styles.countryBase} aria-hidden="true" />)}
        </g>
      </svg>
      {presenceCountries.map(country => {
        const [longitude, latitude] = pinLocations[country.code]
        return <button key={country.code} type="button"
          className={styles.pin + (country.code === 'IND' ? ' ' + styles.indiaPin : '')}
          style={{ left: ((longitude + 180) / 360 * 100) + '%', top: ((90 - latitude) / 180 * 100) + '%' }}
          aria-label={country.code === 'IND' ? 'New Delhi, India - Head Quarters' : country.name} aria-pressed={selectedCode === country.code}
          onPointerEnter={() => setSelectedCode(country.code)} onPointerLeave={() => setSelectedCode(null)}
          onFocus={() => setSelectedCode(country.code)} onBlur={() => setSelectedCode(null)}
          onClick={() => setSelectedCode(country.code)}>
          <svg viewBox="0 0 24 32" aria-hidden="true"><path d="M12 31S1 18 1 12a11 11 0 0 1 22 0c0 6-11 19-11 19Z" /><circle cx="12" cy="12" r="4" /></svg>
          {selectedCode === country.code && <span className={styles.pinLabel}>{country.code === 'IND' ? 'New Delhi, India' : country.name}</span>}
        </button>
      })}
      </div>
      <div className={styles.key}><span aria-hidden="true" /> New Delhi, India - Head Quarters</div>
      <p className={styles.tooltip} role="status" aria-live="polite">
        {selectedCountry ? <strong>{selectedCountry.code === 'IND' ? 'New Delhi, India - Head Quarters' : selectedCountry.name}</strong> : 'Hover, focus, or tap a pin to see the country name.'}
      </p>
    </div>
    <div className={styles.countryList}>
      <div className={styles.listHeading}><p className="eyebrow teal">Planning references</p><h3>Countries named in the supplied material</h3></div>
      {regions.map(region => <div className={styles.region} key={region}>
        <h4>{region}</h4>
        <ul>{presenceCountries.filter(country => country.region === region).map(country => <li key={country.code}>
          <button className={styles.countryButton} type="button" aria-pressed={selectedCode === country.code} onFocus={() => setSelectedCode(country.code)} onClick={() => setSelectedCode(country.code)}>
            <span>{country.name}</span>
          </button>
        </li>)}</ul>
      </div>)}
    </div>
  </section>
}
