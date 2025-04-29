// src/user-component/masjid-card.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Masjid } from "@/types/masjid"
import { MoreVertical, Navigation } from "lucide-react"
import { motion } from "framer-motion"

interface MasjidCardProps {
  masjid: Masjid
}

export default function MasjidCard({ masjid }: MasjidCardProps) {
  // Function to determine if a prayer time is current (within 30 minutes)
  const isCurrentPrayer = (prayerTime: string) => {
    const now = new Date()
    const [hours, minutes] = prayerTime.split(":").map(Number)
    const prayerDate = new Date()
    prayerDate.setHours(hours, minutes, 0)
    
    const diffMinutes = Math.abs(prayerDate.getTime() - now.getTime()) / 60000
    return diffMinutes <= 30
  }

  // Get current prayer
  const getCurrentPrayer = () => {
    const prayerTimes = [
      { name: "Fajr", time: masjid.fajr },
      { name: "Zuhr", time: masjid.zohr },
      { name: "Asr", time: masjid.asr },
      { name: "Maghrib", time: masjid.maghrib },
      { name: "Isha", time: masjid.isha }
    ]
    
    return prayerTimes.find(prayer => isCurrentPrayer(prayer.time))
  }
  
  const currentPrayer = getCurrentPrayer()

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden border-0 bg-white shadow-md dark:bg-gray-900">
        <CardHeader className="flex flex-row items-start justify-between bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
          <div>
            <h3 className="text-xl font-bold">{masjid.name}</h3>
            <p className="text-sm opacity-90">{masjid.area}</p>
          </div>
          <div className="flex items-center space-x-2">
            {currentPrayer && (
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                {currentPrayer.name} Soon
              </Badge>
            )}
            <button className="rounded-full p-1 text-white transition-colors hover:bg-white/20">
              <MoreVertical size={18} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-5 gap-2 text-center">
            {Object.entries({
              Fajr: masjid.fajr,
              Zuhr: masjid.zohr,
              Asr: masjid.asr,
              Maghrib: masjid.maghrib,
              Isha: masjid.isha
            }).map(([prayer, time]) => (
              <div 
                key={prayer} 
                className={`rounded p-2 ${
                  isCurrentPrayer(time) 
                    ? "bg-emerald-100 dark:bg-emerald-950/40" 
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{prayer}</p>
                <p className={`mt-1 font-semibold ${
                  isCurrentPrayer(time) 
                    ? "text-emerald-700 dark:text-emerald-400" 
                    : "text-gray-900 dark:text-white"
                }`}>
                  {time}
                </p>
              </div>
            ))}
          </div>
          
          {/* Directions button */}
          <div className="mt-3 flex justify-end">
            <button 
              className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Navigation size={14} />
              <span>Directions</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
