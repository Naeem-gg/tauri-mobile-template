import { Masjid } from "@/types/masjid"
import { create } from "zustand"

interface Data {
  masjids:Masjid[]
  setMasjids: (masjids: Masjid[]) => void
  sunset: string,
  setSunset: (sunset: string) => void
}

export const useDataStore = create<Data>((set) => ({
  masjids: [],
  setMasjids: (masjids) => set({ masjids }),
  sunset: "",
  setSunset: (sunset) => set({ sunset}),

}))
