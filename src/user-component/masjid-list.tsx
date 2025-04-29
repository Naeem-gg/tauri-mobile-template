import { fetchMasjids } from "@/api"
import { useFilterStore } from "@/store/filter-store"
import { useSearchStore } from "@/store/search-store"
import type { Masjid } from "@/types/masjid"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { debounce } from "lodash"
import { useState, useEffect } from "react"
import MasjidCard from "./masjid-card"

export default function MasjidList() {
  const { 
    data: initialMasjids = [], 
    isLoading, 
    error 
  } = useQuery({ 
    queryKey: ['masjids'], 
    queryFn: fetchMasjids 
  });
  
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const { searchQuery } = useSearchStore()
  const { filters } = useFilterStore()

  // Filter masjids based on search query and filters
  const filterMasjids = debounce(() => {
    if (!initialMasjids) return;
    
    let filtered = [...initialMasjids]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (masjid) =>
          masjid.name.toLowerCase().includes(query) ||
          masjid.area.toLowerCase().includes(query) ||
          masjid.urduName.includes(query) ||
          masjid.urduArea.includes(query),
      )
    }

    // Prayer filter
    if (filters.prayer !== "all") {
      filtered = filtered.filter((masjid) => {
        const prayerTime = masjid[filters.prayer as keyof Masjid] as string
        const [prayerHour, prayerMinute] = prayerTime.split(":").map(Number)

        const [startTime, endTime] = filters.timeRange
        const [startHour, startMinute] = startTime.split(":").map(Number)
        const [endHour, endMinute] = endTime.split(":").map(Number)

        const prayerTimeInMinutes = prayerHour * 60 + prayerMinute
        const startTimeInMinutes = startHour * 60 + startMinute
        const endTimeInMinutes = endHour * 60 + endMinute

        return prayerTimeInMinutes >= startTimeInMinutes && prayerTimeInMinutes <= endTimeInMinutes
      })
    }

    // Area filter
    if (filters.area !== "all") {
      filtered = filtered.filter(
        (masjid) => masjid.area.toLowerCase().includes(filters.area) || masjid.urduArea.includes(filters.area),
      )
    }

    setMasjids(filtered)
  }, 300)

  useEffect(() => {
    filterMasjids()
    return filterMasjids.cancel
  }, [searchQuery, filters, initialMasjids])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex-1 p-4">
      {masjids.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-60 text-center"
        >
          <p className="text-lg font-medium text-gray-500">No masjids found</p>
          <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div layout className="grid gap-4">
            {masjids.map((masjid, index) => (
              <motion.div
                key={masjid.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MasjidCard masjid={masjid} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
