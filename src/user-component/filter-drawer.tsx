// src/user-component/filters-drawer.tsx
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useFilterStore } from "@/store/filter-store"
import { format } from "date-fns"
import { Filter } from "lucide-react"
import { useState } from "react"

const prayers = [
  { value: "all", label: "All Prayers" },
  { value: "fajr", label: "Fajr" },
  { value: "zuhr", label: "Zuhr" },
  { value: "asr", label: "Asr" },
  { value: "maghrib", label: "Maghrib" },
  { value: "isha", label: "Isha" },
]

const areas = [
  { value: "all", label: "All Areas" },
  { value: "gulshan", label: "Gulshan" },
  { value: "nazimabad", label: "Nazimabad" },
  { value: "saddar", label: "Saddar" },
  { value: "clifton", label: "Clifton" },
  { value: "dha", label: "DHA" },
]

export default function FiltersDrawer() {
  const { filters, setFilters } = useFilterStore()
  
  // Local state to manage form values
  const [localFilters, setLocalFilters] = useState(filters)
  
  // Convert minutes to time string (HH:MM)
  const minutesToTimeString = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
  }

  // Convert time string to minutes
  const timeStringToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  // Default time range: 4:00 AM to 10:00 PM
  const defaultTimeRange = [240, 1320] // 4 hours and 22 hours in minutes
  
  // Current time range in minutes
  const [timeRange, setTimeRange] = useState(
    filters.timeRange 
      ? [timeStringToMinutes(filters.timeRange[0]), timeStringToMinutes(filters.timeRange[1])]
      : defaultTimeRange
  )

  // Handle time range change
  const handleTimeRangeChange = (value: number[]) => {
    setTimeRange(value)
    setLocalFilters({
      ...localFilters,
      timeRange: [minutesToTimeString(value[0]), minutesToTimeString(value[1])]
    })
  }

  // Apply filters
  const applyFilters = () => {
    setFilters(localFilters)
  }

  // Reset filters
  const resetFilters = () => {
    const defaultFilters = {
      prayer: "all",
      area: "all",
      timeRange: [minutesToTimeString(defaultTimeRange[0]), minutesToTimeString(defaultTimeRange[1])] as [string, string]
    }
    setLocalFilters(defaultFilters)
    setTimeRange(defaultTimeRange)
    setFilters(defaultFilters)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={16} />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filter Masjids</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-6">
              {/* Prayer Selection */}
              <div className="space-y-2">
                <Label htmlFor="prayer">Prayer</Label>
                <Select 
                  value={localFilters.prayer} 
                  onValueChange={(value) => setLocalFilters({...localFilters, prayer: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select prayer" />
                  </SelectTrigger>
                  <SelectContent>
                    {prayers.map((prayer) => (
                      <SelectItem key={prayer.value} value={prayer.value}>
                        {prayer.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Area Selection */}
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <RadioGroup 
                  value={localFilters.area} 
                  onValueChange={(value) => setLocalFilters({...localFilters, area: value})}
                  className="grid grid-cols-2 gap-2"
                >
                  {areas.map((area) => (
                    <div key={area.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={area.value} id={area.value} />
                      <Label htmlFor={area.value}>{area.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Time Range Selection */}
              <div className="space-y-4">
                <Label>Prayer Time Range</Label>
                <Slider
                  defaultValue={timeRange}
                  value={timeRange}
                  min={0}
                  max={1440}
                  step={15}
                  onValueChange={handleTimeRangeChange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{format(new Date().setHours(Math.floor(timeRange[0]/60), timeRange[0]%60), 'h:mm a')}</span>
                  <span>{format(new Date().setHours(Math.floor(timeRange[1]/60), timeRange[1]%60), 'h:mm a')}</span>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                Reset
              </Button>
              <Button className="flex-1" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
