import { readFile, writeFile } from 'node:fs/promises'

const sourcePath = new URL('../data/world-countries.geojson', import.meta.url)
const outputPath = new URL('../data/world-map-paths.json', import.meta.url)
const { features } = JSON.parse(await readFile(sourcePath, 'utf8'))

const point = ([longitude, latitude]) => [
  Math.round(((longitude + 180) / 360) * 9600) / 10,
  Math.round(((90 - latitude) / 180) * 4800) / 10,
]

function ringPath(ring) {
  const segments = []
  let segment = []
  let previousLongitude

  for (const coordinate of ring) {
    const [longitude] = coordinate
    if (previousLongitude !== undefined && Math.abs(longitude - previousLongitude) > 180) {
      if (segment.length > 1) segments.push(segment)
      segment = []
    }
    segment.push(point(coordinate))
    previousLongitude = longitude
  }
  if (segment.length > 1) segments.push(segment)

  return segments.map((coordinates) => coordinates.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z').join(' ')
}

function polygonPath(geometry) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  return polygons.flatMap((polygon) => polygon.map(ringPath)).filter(Boolean).join(' ')
}

const countries = features
  .filter(({ geometry }) => geometry && ['Polygon', 'MultiPolygon'].includes(geometry.type))
  .map(({ properties, geometry }) => ({
    code: properties.ADM0_A3,
    name: properties.ADMIN,
    path: polygonPath(geometry),
  }))
  .filter(({ path }) => path)

await writeFile(outputPath, `${JSON.stringify(countries)}\n`)
console.log(`Generated ${countries.length} country paths (${(Buffer.byteLength(JSON.stringify(countries)) / 1024).toFixed(1)} KB).`)
