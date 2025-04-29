import { Masjid } from "@/types/masjid";

export const fetchMasjids = async () => {
    const response = await fetch('https://salahtime.in/api/android/get-masjids');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  export const createMasjid = async (newMasjid:Masjid) => {
    const response = await fetch('/api/masjids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMasjid),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create masjid');
    }
    
    return response.json();
  };
  