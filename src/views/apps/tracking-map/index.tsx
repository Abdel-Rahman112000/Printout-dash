import TrackingMapFilters from './SearchFilters'
import TrackingGoogleMap from './TrackingGoogleMap'
import { TrackingMapCxtProvider } from './TrackingMapCxt'

export default function TrackingMapMainView() {
  return (
    <TrackingMapCxtProvider>
      <TrackingMapFilters />
      <TrackingGoogleMap />
    </TrackingMapCxtProvider>
  )
}
