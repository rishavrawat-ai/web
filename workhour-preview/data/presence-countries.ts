export type PresenceCountry = {
  code: string
  name: string
  region: string
  status: 'provisional'
}

// These are the countries named in supplied planning material, not confirmed offices or service territories.
export const presenceCountries: PresenceCountry[] = [
  { code: 'IND', name: 'India', region: 'Asia', status: 'provisional' },
  { code: 'MYS', name: 'Malaysia', region: 'Asia', status: 'provisional' },
  { code: 'AUS', name: 'Australia', region: 'Oceania', status: 'provisional' },
  { code: 'ARE', name: 'United Arab Emirates', region: 'Middle East', status: 'provisional' },
  { code: 'KEN', name: 'Kenya', region: 'Africa', status: 'provisional' },
  { code: 'ZWE', name: 'Zimbabwe', region: 'Africa', status: 'provisional' },
  { code: 'MWI', name: 'Malawi', region: 'Africa', status: 'provisional' },
  { code: 'RWA', name: 'Rwanda', region: 'Africa', status: 'provisional' },
  { code: 'CAN', name: 'Canada', region: 'North America', status: 'provisional' },
  { code: 'MEX', name: 'Mexico', region: 'North America', status: 'provisional' },
]
