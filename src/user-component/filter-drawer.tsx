import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilterStore } from "@/store/filter-store"
import { format } from "date-fns"

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
}

export default function FilterDrawer({ open, onClose }: FilterDrawerProps) {
  const { filters, setFilters, resetFilters } = useFilterStore()
  const [localFilters, setLocalFilters] = useState(filters)

  const prayers = [
    { value: "fajr", label: "Fajr", urduLabel: "فجر" },
    { value: "zohr", label: "Zohr", urduLabel: "ظہر" },
    { value: "asr", label: "Asr", urduLabel: "عصر" },
    { value: "maghrib", label: "Maghrib", urduLabel: "مغرب" },
    { value: "isha", label: "Isha", urduLabel: "عشاء" },
    { value: "juma", label: "Juma", urduLabel: "جمعہ" },
  ]

  const areas = [
    { value: "all", label: "All Areas" },
    { value: "downtown", label: "Downtown / ڈاؤن ٹاؤن" },
    { value: "central-park", label: "Central Park / سینٹرل پارک" },
    { value: "green-valley", label: "Green Valley / گرین ویلی" },
  ]

  const handleApply = () => {
    setFilters(localFilters)
    onClose()
  }

  const handleReset = () => {
    const reset = {
      prayer: "all",
      timeRange: ["05:00", "22:00"] as [string, string],
      area: "all",
    }
    setLocalFilters(reset)
    resetFilters()
  }

  // Convert time range for display
  const formatTimeRange = (time: string) => {
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours, 10))
    date.setMinutes(Number.parseInt(minutes, 10))
    return format(date, "h:mm a")
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-center text-xl">Filter Masjids</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto pb-20">
          <div className="space-y-3">
            <Label className="text-base font-medium">Prayer</Label>
            <RadioGroup
              value={localFilters.prayer}
              onValueChange={(value) => setLocalFilters({ ...localFilters, prayer: value })}
              className="grid grid-cols-3 gap-2"
            >
              <div className="col-span-3">
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex-1">
                    All Prayers
                  </Label>
                </div>
              </div>

              {prayers.map((prayer) => (
                <div key={prayer.value} className="col-span-1">
                  <div className="flex flex-col items-center space-y-1 rounded-md border p-3 text-center">
                    <RadioGroupItem value={prayer.value} id={prayer.value} className="mx-auto" />
                    <Label htmlFor={prayer.value} className="text-sm">
                      {prayer.label}
                    </Label>
                    <span className="text-xs font-medium text-muted-foreground">{prayer.urduLabel}</span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Prayer Time Range</Label>
            <div className="px-2">
              <Slider
                defaultValue={[5, 22]}
                min={0}
                max={24}
                step={0.5}
                onValueChange={(value) => {
                  const [start, end] = value
                  const startHour = Math.floor(start)
                  const startMin = start % 1 === 0 ? "00" : "30"
                  const endHour = Math.floor(end)
                  const endMin = end % 1 === 0 ? "00" : "30"

                  setLocalFilters({
                    ...localFilters,
                    timeRange: [
                      `${startHour.toString().padStart(2, "0")}:${startMin}`,
                      `${endHour.toString().padStart(2, "0")}:${endMin}`,
                    ],
                  })
                }}
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>{formatTimeRange(localFilters.timeRange[0])}</span>
                <span>{formatTimeRange(localFilters.timeRange[1])}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Area</Label>
            <Select
              value={localFilters.area}
              onValueChange={(value) => setLocalFilters({ ...localFilters, area: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              Reset
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
