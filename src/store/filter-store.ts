"use client"

import { create } from "zustand"
import type { FilterOptions } from "@/types/masjid"

interface FilterState {
  filters: FilterOptions
  setFilters: (filters: FilterOptions) => void
  resetFilters: () => void
}

const defaultFilters: FilterOptions = {
  prayer: "all",
  timeRange: ["05:00", "22:00"],
  area: "all",
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
}))
