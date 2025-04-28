import { useState } from "react"
import type { Masjid, Prayer } from "@/types/masjid"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, parse } from "date-fns"

interface MasjidCardProps {
  masjid: Masjid
}

export default function MasjidCard({ masjid }: MasjidCardProps) {
  const [expanded, setExpanded] = useState(false)

  const prayers: Prayer[] = [
    { name: "Fajr", urduName: "فجر", time: masjid.fajr },
    { name: "Zohr", urduName: "ظہر", time: masjid.zohr },
    { name: "Asr", urduName: "عصر", time: masjid.asr },
    { name: "Maghrib", urduName: "مغرب", time: masjid.maghrib },
    { name: "Isha", urduName: "عشاء", time: masjid.isha },
    { name: "Juma", urduName: "جمعہ", time: masjid.juma },
  ]

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    try {
      const parsedTime = parse(time, "HH:mm", new Date())
      return format(parsedTime, "h:mm a")
    } catch (error) {
      return time // Fallback to original format if parsing fails
    }
  }

  // Find the next prayer
  const getNextPrayer = (): Prayer | null => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute

    for (const prayer of prayers) {
      const [prayerHour, prayerMinute] = prayer.time.split(":").map(Number)
      const prayerTimeInMinutes = prayerHour * 60 + prayerMinute

      if (prayerTimeInMinutes > currentTimeInMinutes) {
        return prayer
      }
    }

    return prayers[0] // Return Fajr if all prayers for today have passed
  }

  const nextPrayer = getNextPrayer()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{masjid.name}</h3>
              <h4 className="text-sm text-gray-500 font-medium">{masjid.urduName}</h4>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>
                  {masjid.area} / {masjid.urduArea}
                </span>
              </div>
            </div>

            {nextPrayer && (
              <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center">
                <Clock className="h-3.5 w-3.5 text-green-600 mr-1" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-green-600">{nextPrayer.name}</span>
                  <span className="text-xs text-green-700">{formatTime(nextPrayer.time)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {prayers.slice(0, 3).map((prayer) => (
              <div key={prayer.name} className="bg-gray-100 px-2 py-1 rounded text-xs">
                <span className="font-medium">{prayer.name}</span>: {formatTime(prayer.time)}
              </div>
            ))}
            {!expanded && prayers.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="px-2 py-1 h-auto text-xs font-normal"
                onClick={() => setExpanded(true)}
              >
                +{prayers.length - 3} more
              </Button>
            )}
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {prayers.slice(3).map((prayer) => (
                    <div key={prayer.name} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      <span className="font-medium">{prayer.name}</span>: {formatTime(prayer.time)}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="w-full mt-2 h-6 text-xs">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
