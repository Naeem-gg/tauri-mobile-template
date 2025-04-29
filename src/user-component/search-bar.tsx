import { Input } from "@/components/ui/input"
import { useSearchStore } from "@/store/search-store"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchStore()
  

  return (
    <>
      <motion.div
        className="sticky top-0 z-10 bg-white p-4 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or area..."
              className="pl-9 pr-4 h-12 rounded-full border-gray-200"
            />
          </div>
        </div>
      </motion.div>
    </>
  )
}
