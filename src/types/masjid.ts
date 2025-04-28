export interface Masjid {
    id: string
    name: string
    route: string
    area: string
    fajr: string
    zohr: string
    asr: string
    maghrib: string
    isha: string
    juma: string
    urduName: string
    urduArea: string
    userId: string
    adminId: string
    complaintCount: string
    latitude: string
    longitude: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Prayer {
    name: string
    urduName: string
    time: string
  }
  
  export interface FilterOptions {
    prayer: string
    timeRange: [string, string]
    area: string
  }
  