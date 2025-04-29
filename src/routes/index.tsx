import MasjidList from "@/user-component/masjid-list"


import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <MasjidList/>
    </main>
  )
}