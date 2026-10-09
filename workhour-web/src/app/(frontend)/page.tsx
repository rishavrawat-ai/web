import { Homepage } from '../../components/homepage/Homepage'
import { getPublishedHomepageData } from '../../lib/homepage'

// Payload's Local API reads PostgreSQL directly and is not part of Next's data
// cache. Render this route per request so a newly published edit appears
// without a rebuild or stale full-route cache.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let homepageData
  let loadError = false

  try {
    homepageData = await getPublishedHomepageData()
  } catch (error) {
    console.error('Unable to load published homepage content.', error)
    homepageData = { homepage: null, businesses: [] }
    loadError = true
  }

  return <Homepage {...homepageData} loadError={loadError} />
}
