import PrayerTimesCard from '@/salah-web-components/SingleTable'
import { useDataStore } from '@/store/data-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/masjid/$route')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return params.route
  }
})

function RouteComponent() {

  const {route:$route} = Route.useParams()
  const masjids = useDataStore(state => state.masjids)
  const findMasjid = masjids.find(masjid => masjid.route === $route)!
  return <div> 
    <PrayerTimesCard
        sunset={"00:00"}
        masjid={findMasjid}
      /></div>
}
