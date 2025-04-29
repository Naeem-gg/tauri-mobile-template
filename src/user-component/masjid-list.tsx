// src/user-component/masjid-list.tsx
import { fetchMasjids } from "@/api"
import { useFilterStore } from "@/store/filter-store"
import { useSearchStore } from "@/store/search-store"
import type { Masjid } from "@/types/masjid"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { debounce } from "lodash"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Search } from "lucide-react"
import MasjidCard from "./masjid-card"
import MasjidCardSkeleton from "./masjid-card-skeleton"
import FiltersDrawer from "./filter-drawer"
import { Badge } from "@/components/ui/badge"

export default function MasjidList() {
  const { 
    data: initialMasjids = [], 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery({ 
    queryKey: ['masjids'], 
    queryFn: fetchMasjids 
  });
  
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const { searchQuery, setSearchQuery } = useSearchStore()
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
          masjid.urduName?.includes(query) ||
          masjid.urduArea?.includes(query),
      )
    }

    // Prayer filter
    if (filters.prayer !== "all") {
      filtered = filtered.filter((masjid) => {
        const prayerTime = masjid[filters.prayer as keyof Masjid] as string
        if (!prayerTime) return false;
        
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
        (masjid) => 
          masjid.area.toLowerCase().includes(filters.area.toLowerCase()) || 
          masjid.urduArea?.includes(filters.area)
      )
    }

    setMasjids(filtered)
  }, 300)

  useEffect(() => {
    filterMasjids()
    return filterMasjids.cancel
  }, [searchQuery, filters, initialMasjids])

  // Render skeletons while loading
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <MasjidCardSkeleton key={index} />
    ))
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Header with search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Salahtime
          </h1>
          
          <FiltersDrawer />
        </div>
        
        {/* Search field */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search masjids by name or area..."
            className="pl-10 pr-4"
          />
        </div>
        
        {/* Active filters display */}
        {(filters.prayer !== "all" || filters.area !== "all") && (
          <div className="flex flex-wrap gap-2">
            {filters.prayer !== "all" && (
              <Badge className="flex items-center gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">
                <span>{filters.prayer.charAt(0).toUpperCase() + filters.prayer.slice(1)}</span>
              </Badge>
            )}
            
            {filters.area !== "all" && (
              <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                <span>{filters.area}</span>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results count and refresh button */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isLoading || isFetching 
            ? "Loading masjids..." 
            : `Showing ${masjids.length} masjid${masjids.length !== 1 ? 's' : ''}`}
        </p>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => refetch()} 
          disabled={isLoading || isFetching}
          className="flex items-center gap-1 text-xs"
        >
          <RefreshCw size={14} className={`${isFetching ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Main content */}
      {isLoading ? (
        <div className="space-y-4">{renderSkeletons()}</div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900/50 dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-300">Error: {error instanceof Error ? error.message : 'Failed to load masjids'}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
            Try Again
          </Button>
        </div>
      ) : masjids.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">No masjids found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div layout className="space-y-4">
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

