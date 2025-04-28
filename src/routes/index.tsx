import { Masjid } from "@/types/masjid"
import MasjidList from "@/user-component/masjid-list"
import SearchBar from "@/user-component/search-bar"


import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [masjids, setMasjids] = useState<Masjid[]>([])
  useEffect(()=>{
    async function fetchMasjids() {
      const response = await fetch("https://salahtime.in/api/android/get-masjids")
      const data = await response.json()
      setMasjids(data)
    }
    fetchMasjids()
  },[])
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <SearchBar />
      <MasjidList initialMasjids={masjids} />
    </main>
  )
}