import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { addMinutesToTime, convertTime } from "@/lib/funs"
import { getTimeAgo } from "@/lib/getTmeAgo"
import { AnimatePresence, motion } from "framer-motion"
import { startCase } from "lodash"
import { MapPin, Moon, Sun, Sunrise, Sunset } from "lucide-react"
import { useState } from "react"
import { ShareDialog } from "./ShareDialog"

export type Masjid = {
  id: string
  name: string
  urduName: string
  urduArea: string
  route: string
  area: string
  fajr: string
  zohr: string
  asr: string
  isha: string
  juma: string
  maghrib: string
  userId: string
  createdAt: string
  updatedAt: string
  complaintCount: string
  latitude: string
  longitude: string
}

const prayerConfig = [
  { name: "Fajr", icon: Sunrise, color: "text-blue-400" },
  { name: "Zohr", icon: Sun, color: "text-yellow-500" },
  { name: "Asr", icon: Sun, color: "text-orange-500" },
  { name: "Maghrib", icon: Sunset, color: "text-red-500" },
  { name: "Isha", icon: Moon, color: "text-indigo-600" },
  { name: "Juma", icon: Sun, color: "text-green-500" },
]

export default function PrayerTimesCard({
  masjid,
  sunset,
 
}: {
  masjid: Masjid
  sunset: string
 
}) {
  const prayerTimes = [
    { name: "Fajr", time: masjid.fajr, period: "AM", urdu: "فجر " },
    { name: "Zohr", time: masjid.zohr, period: "PM", urdu: "ظہر " },
    { name: "Asr", time: masjid.asr, period: "PM", urdu: "عصر " },
    {
      name: "Maghrib",
      time: addMinutesToTime(Number.parseInt(masjid.maghrib), convertTime(sunset)).padStart(5, "0"),
      period: "PM",
      urdu: "مغرب ",
    },
    { name: "Isha", time: masjid.isha, period: "PM", urdu: "عشاء " },
    { name: "Juma", time: masjid.juma, period: "PM", urdu: "جمعہ" },
  ]

  const shareUrl = `https://salahtime.in/masjid/${masjid.route}`
  const [language, setLanguage] = useState<"english" | "urdu">("urdu")
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null)
  // const [englishPrayerName, setEnglishPrayerName] = useState<string>("")
  // const [isLoading, setIsLoading] = useState(false)
  // const [isDialogOpenMaghrib, setIsDialogOpenMaghrib] = useState(false)
  // const [maghribAdjustment, setMaghribAdjustment] = useState(Number.parseInt(masjid.maghrib))

  // const openDialog = (prayerName: string, prayerTime: string, englishName: string) => {
   
  //   if (englishName === "Maghrib") {
  //     setMaghribAdjustment(Number.parseInt(masjid.maghrib))
  //     return setIsDialogOpenMaghrib(true)
  //   }
  //   setSelectedPrayer(prayerName)
  //   setEnglishPrayerName(englishName)
  //   setHours(Number(prayerTime.split(":")[0]))
  //   setMinutes(Number(prayerTime.split(":")[1]))
  //   setIsDialogOpen(true)
  // }

  // const closeDialog = () => {
  //   setIsDialogOpen(false)
  //   setSelectedPrayer(null)
  //   setHours(0)
  //   setMinutes(0)
  // }

  // const [hours, setHours] = useState(0)
  // const [minutes, setMinutes] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen p-4"
    >
      <Card className="w-full max-w-md shadow-2xl overflow-hidden bg-background">
      {/* {!session.data?.user && <LoginDialog />} */}
      {/* {(session.data?.user.isAdmin || isUserOwner) && <TimeConfirmationDialog masjidId={masjid.id} />} */}
        {/* {session.data?.user.isAdmin && <EditOptions masjid={masjid} />} */}
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <Tabs defaultValue={language} onValueChange={(value) => setLanguage(value as "english" | "urdu")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="urdu">اردو</TabsTrigger>
            </TabsList>
            <TabsContent value="english" className="mt-4">
              <h2 className="text-3xl font-bold text-center">{startCase(masjid.name)}</h2>
              <p className="text-xl text-center text-primary-foreground/80 mt-2">{startCase(masjid.area)}</p>
            </TabsContent>
            <TabsContent value="urdu" className="mt-4">
              <h2 className="text-4xl font-bold text-center">{masjid.urduName}</h2>
              <p className="text-2xl text-center text-primary-foreground/80 mt-2">{masjid.urduArea}</p>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {prayerTimes.map((prayer) => {
              const config = prayerConfig.find((p) => p.name === prayer.name)
              const Icon = config?.icon || Sun
              return (
                <motion.div
                  key={prayer.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-center justify-center transition-all overflow-hidden hover:bg-accent/10"
                    // onClick={() => openDialog(prayer.urdu, prayer.time, prayer.name)}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className={`font-semibold text-2xl ${language === "urdu" ? "text-4xl" : ""}`}>
                        {language === "english" ? prayer.name : prayer.urdu}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={config?.color}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-bold mt-2"
                      >
                        {prayer.time} {prayer.period}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col items-center bg-muted p-4 space-y-4">
  {/* First Row: Time Ago and Action Buttons */}
  <div className="flex items-center justify-between w-full">
    {/* Time Ago Text */}
    <p className="text-sm text-muted-foreground">{getTimeAgo(masjid.updatedAt)}</p>

    {/* Action Buttons (Report, Directions) */}
    <div className="flex space-x-2">
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <VoteIncorrectTimeDialog
              masjidId={masjid.id}
              voteCount={masjid.complaintCount || "0"}
              lastUpdated={masjid.updatedAt}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Report incorrect time</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
      {/* <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MasjidPoster
            masjidName={masjid.urduName}
            qrValue={shareUrl}
            englishFileName={masjid.name}
            title={language === "english" ? "QR Code" : "کوڈ  QR "}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Generate QR Code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider> */}
    {masjid.latitude !== "0" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${masjid.latitude},${masjid.longitude}&zoom=15`}
                className="p-2"
                target="_blank"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get directions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ShareDialog url={shareUrl} masjid={masjid} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   
    </div>
  </div>

</CardFooter>
      </Card>
     
     
      {/* <ChangeTimeDialog
          closeDialog={closeDialog}
          englishPrayerName={englishPrayerName}
          hours={hours}
          isDialogOpen={isDialogOpen}
          isLoading={isLoading}
          masjid={masjid}
          minutes={minutes}
          selectedPrayer={selectedPrayer}
          setHours={setHours}
          setMinutes={setMinutes}
          setIsDialogOpen={setIsDialogOpen}
          setIsLoading={setIsLoading}
          />
        <ChangeMaghribTimeDialog
          isDialogOpenMaghrib={isDialogOpenMaghrib}
          isLoading={isLoading}
          maghribAdjustment={maghribAdjustment}
          masjid={masjid}
          setIsDialogOpenMaghrib={setIsDialogOpenMaghrib}
          setMaghribAdjustment={setMaghribAdjustment}
          sunset={sunset}
          setIsLoading={setIsLoading}
        /> */}
    </motion.div>
  )
}

