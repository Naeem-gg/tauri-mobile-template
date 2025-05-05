import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { startCase } from "lodash"
import {
  Clock,
  Filter,
  Loader2,
  MapPin,
  Plus,
  RefreshCcw,
  Search,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react"
import type React from "react"


import { addMinutesToTime, convertTime } from "@/lib/funs"
import { getTimeAgo } from "@/lib/getTmeAgo"
import { Link, useNavigate } from "@tanstack/react-router"
import { memo, useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { Mosque } from "./SVGs"
import ToggleLanguage from "./ToggleLanguage"

export type Masjid = {
  id: string
  name: string
  area: string
  urduArea: string
  urduName: string
  fajr: string
  zohr: string
  asr: string
  isha: string
  juma: string
  route: string
  maghrib: string
  updatedAt: string
}

export type SalahKey = "fajr" | "zohr" | "asr" | "isha" | "juma" | "maghrib"

const PRAYER_COLORS: Record<SalahKey, string> = {
  fajr: "bg-blue-500 text-white hover:bg-blue-600",
  zohr: "bg-yellow-500 text-white hover:bg-yellow-600",
  asr: "bg-green-500 text-white hover:bg-green-600",
  maghrib: "bg-orange-500 text-white hover:bg-orange-600",
  isha: "bg-violet-500 text-white hover:bg-violet-600",
  juma: "bg-emerald-500 text-white hover:bg-emerald-600",
}

const PRAYER_NAMES = {
  english: {
    fajr: "Fajr",
    zohr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    juma: "Jumu'ah",
  },
  urdu: {
    fajr: "فجر",
    zohr: "ظہر",
    asr: "عصر",
    maghrib: "مغرب",
    isha: "عشاء",
    juma: "جمعہ",
  },
}

const MasjidItem = memo(
  ({
    masjid,    searchTerm,
    searchMode,
    badgeSalah,
    sunset,
    highlightText,
    index
  }: {
    masjid: Masjid
    index: number
    searchTerm: string
    searchMode: "english" | "urdu"
    badgeSalah: SalahKey
    sunset: string
    highlightText: (text: string, highlight: string) => React.ReactNode
  }) => {
    const isOld = Number.parseInt(getTimeAgo(masjid.updatedAt).split(" ")[0]) >= 20
    const isUnavailable = masjid[badgeSalah] === "00:00"

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={`mb-3 overflow-hidden transition-all duration-200 hover:shadow-md ${
            isOld ? "border-l-4 border-red-500" : ""
          }`}
        >
          <Link to={`/masjid/$route`} params={{route: masjid.route}} className="block p-4 hover:bg-accent/50">
            <div className={`flex items-start gap-3 ${searchMode === "english" ? "flex-row" : "flex-row-reverse"}`}>
                <>{index+1}</>
              <div className="flex-shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isOld ? "bg-red-100 text-red-600" : "bg-primary/10"
                  }`}
                >
                  <Mosque className={`h-5 w-5 ${isOld ? "text-red-600" : "text-primary"}`} />
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <div
                  className={`flex items-center gap-2 ${
                    searchMode === "english" ? "flex-row" : "flex-row-reverse text-right"
                  }`}
                >
                  <h3
                    dir={searchMode === "english" ? "ltr" : "rtl"}
                    className={`font-medium ${searchMode === "english" ? "text-base" : "text-lg"}`}
                  >
                    {highlightText(searchMode === "english" ? startCase(masjid.name) : masjid.urduName, searchTerm)}
                  </h3>
                </div>

                <div
                  className={`flex items-center gap-1 text-muted-foreground ${
                    searchMode === "english" ? "flex-row" : "flex-row-reverse text-right"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <p
                    dir={searchMode === "english" ? "ltr" : "rtl"}
                    className={`${searchMode === "english" ? "text-sm" : "text-base"}`}
                  >
                    {highlightText(searchMode === "english" ? startCase(masjid.area) : masjid.urduArea, searchTerm)}
                  </p>
                </div>

              </div>
                <div
                  className={`flex items-center gap-2 pt-1 ${
                    searchMode === "english" ? "flex-row" : "flex-row-reverse text-right"
                  }`}
                >
                  <Badge
                    variant={isUnavailable || isOld ? "destructive" : "default"}
                    className={`${!isUnavailable && !isOld ? PRAYER_COLORS[badgeSalah] : ""} px-2.5 py-1`}
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    {isUnavailable
                      ? searchMode === "english"
                        ? "Unavailable"
                        : "دستیاب نہیں"
                      : isOld
                        ? getTimeAgo(masjid.updatedAt)
                        : badgeSalah === "maghrib"
                          ? addMinutesToTime(Number.parseInt(masjid.maghrib), convertTime(sunset)).padStart(5, "0")
                          : masjid[badgeSalah]}{" "}
                    {!isUnavailable && !isOld && <span>{badgeSalah === "fajr" ? " AM " : " PM "}</span>}
                  </Badge>
                  {isOld && (
                    <span className="text-xs text-red-500">
                      {searchMode === "english" ? "Outdated information" : "پرانی معلومات"}
                    </span>
                  )}
                </div>
            </div>
          </Link>
        </Card>
      </motion.div>
    )
  },
)

MasjidItem.displayName = "MasjidItem"

export default function SearchableList({
  data,
  currentSalah,
  sunset="00:00",
}: {
  data: Masjid[]
  currentSalah: SalahKey
  sunset: string
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [searchMode, setSearchMode] = useState<"english" | "urdu">("urdu")
  const [sortBy, setSortBy] = useState<"name" | "area" | "time">("time")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 24])
  const [selectedPrayerTypes, setSelectedPrayerTypes] = useState<SalahKey[]>([])
  const [isPending] = useTransition()
  const [badgeSalah, setBadgeSalah] = useState<SalahKey>(currentSalah)
  const [showFilters, setShowFilters] = useState(false)
  const router = useNavigate()

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredItems = useMemo(() => {
    return data && data.filter((item) => {
      const searchLower = debouncedSearchTerm.toLowerCase()
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.area.toLowerCase().includes(searchLower) ||
        item.urduName.toLowerCase().includes(searchLower) ||
        item.urduArea.toLowerCase().includes(searchLower)
      const matchesArea = selectedAreas.length === 0 || selectedAreas.includes(item.area)
      const matchesPrayerType =
        selectedPrayerTypes.length === 0 ||
        selectedPrayerTypes.some((type) => {
          const time = item[type]
          const [hours, minutes] = time.split(":").map(Number)
          const totalMinutes = hours * 60 + minutes
          return totalMinutes >= selectedTimeRange[0] * 60 && totalMinutes <= selectedTimeRange[1] * 60
        })
      return matchesSearch && matchesArea && matchesPrayerType
    })
  }, [data, debouncedSearchTerm, selectedAreas, selectedPrayerTypes, selectedTimeRange])

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      // First, sort by whether the item is old or not
      const isAOld = Number.parseInt(getTimeAgo(a.updatedAt).split(" ")[0]) >= 20
      const isBOld = Number.parseInt(getTimeAgo(b.updatedAt).split(" ")[0]) >= 20

      if (isAOld !== isBOld) {
        // If one is old and the other is not, move the old item to the end
        return isAOld ? 1 : -1
      }

      // If both are old or both are new, apply the secondary sort logic
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "area") {
        comparison = a.area.localeCompare(b.area)
      } else if (sortBy === "time") {
        comparison = a[badgeSalah].localeCompare(b[badgeSalah])
      }

      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [filteredItems, sortBy, sortOrder, badgeSalah])

  const highlightText = useCallback((text: string, highlight: string) => {
    if (!highlight.trim()) return text
    const regex = new RegExp(`(${highlight})`, "gi")
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }, [])

  const resetFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedAreas([])
    setSelectedPrayerTypes([])
    setSelectedTimeRange([0, 24])
    setSortBy("time")
    setSortOrder("asc")
    router({to:"/"})
  }, [router])

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      selectedAreas.length > 0 ||
      selectedPrayerTypes.length > 0 ||
      selectedTimeRange[0] !== 0 ||
      selectedTimeRange[1] !== 24 ||
      sortBy !== "time" ||
      sortOrder !== "asc"
    )
  }, [searchTerm, selectedAreas, selectedPrayerTypes, selectedTimeRange, sortBy, sortOrder])

  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-4">
      {/* Search and language toggle */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchMode === "english" ? "Search masjids..." : "مسجد تلاش کریں..."}
            className="w-full rounded-lg border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            dir={searchMode === "english" ? "ltr" : "rtl"}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <ToggleLanguage searchMode={searchMode} setSearchMode={setSearchMode} />

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1.5">
              <Filter className="h-4 w-4" />
              {searchMode === "english" ? "Filters" : "فلٹرز"}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5 text-muted-foreground">
                <RefreshCcw className="h-3.5 w-3.5" />
                {searchMode === "english" ? "Reset" : "ری سیٹ"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-lg border bg-card shadow"
          >
            <div className="space-y-3 p-4">
              {/* Prayer type selection */}
              <div>
                <h3 className={`mb-2 text-sm font-medium ${searchMode !== "english" &&'text-right'}`}>{searchMode === "english" ? "Prayer Time" : "نماز کا وقت"}</h3>
                <div className={`flex flex-wrap ${searchMode !== "english" &&'flex-row-reverse'} gap-2`}>
                  {(Object.keys(PRAYER_COLORS) as SalahKey[]).map((prayer) => (
                    <Button
                      key={prayer}

                      variant={badgeSalah === prayer ? "default" : "outline"}
                      className={`${badgeSalah === prayer ? PRAYER_COLORS[prayer] : ""} text-lg`}
                      onClick={() => setBadgeSalah(prayer)}
                    >
                      {searchMode === "english" ? PRAYER_NAMES.english[prayer] : PRAYER_NAMES.urdu[prayer]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div>
                <h3 className={`mb-2 text-sm font-medium ${searchMode !== "english" &&'text-right'}`}>{searchMode === "english" ? "Sort By" : "ترتیب دیں"}</h3>
                <div className="flex gap-2">
                  <Tabs
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as "name" | "area" | "time")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="name">{searchMode === "english" ? "Name" : "نام"}</TabsTrigger>
                      <TabsTrigger value="area">{searchMode === "english" ? "Area" : "علاقہ"}</TabsTrigger>
                      <TabsTrigger value="time">{searchMode === "english" ? "Time" : "وقت"}</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    aria-label={sortOrder === "asc" ? "Sort ascending" : "Sort descending"}
                  >
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Additional filters would go here */}
              {/* <Filters
                setSalah={setBadgeSalah}
                searchMode={searchMode}
                data={data}
                setSelectedAreas={setSelectedAreas}
                setSelectedPrayerTypes={setSelectedPrayerTypes}
                selectedAreas={selectedAreas}
                selectedPrayerTypes={selectedPrayerTypes}
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
              /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count and current prayer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${PRAYER_COLORS[badgeSalah]} px-2.5 py-1 text-lg`}>
            {searchMode === "english" ? PRAYER_NAMES.english[badgeSalah] : PRAYER_NAMES.urdu[badgeSalah]}
          </Badge>
        </div>

        <span className="text-sm text-muted-foreground">
          {sortedItems.length} {searchMode === "english" ? `masjid${sortedItems.length !== 1 ? "s" : ""}` : "مساجد"}{" "}
          {searchMode === "english" ? "found" : "ملے"}
        </span>
      </div>

      {/* Masjid list */}
      <ScrollArea className="relative h-[calc(100vh-280px)]">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <AnimatePresence>
          {sortedItems.length > 0 ? (
            sortedItems.map((masjid, index) => (
              <MasjidItem
                key={masjid.id}
                masjid={masjid}
                index={index}
                searchTerm={debouncedSearchTerm}
                searchMode={searchMode}
                badgeSalah={badgeSalah}
                sunset={sunset}
                highlightText={highlightText}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center rounded-lg p-8 text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Mosque className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">
                {searchMode === "english" ? "No matching masjids found" : "کوئی مسجد نہیں ملی"}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {searchMode === "english"
                  ? "Try adjusting your filters or add a new masjid"
                  : "اپنے فلٹرز کو ایڈجسٹ کریں یا نئی مسجد شامل کریں"}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetFilters} className="gap-1.5">
                  <RefreshCcw className="h-4 w-4" />
                  {searchMode === "english" ? "Reset filters" : "فلٹرز ری سیٹ کریں"}
                </Button>
                <Button asChild className="gap-1.5">
                  <a href="https://salahtime.in/new-masjid">
                    <Plus className="h-4 w-4" />
                    {searchMode === "english" ? "Add masjid" : "مسجد شامل کریں"}
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
