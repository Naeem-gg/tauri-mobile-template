import { fetchMasjids } from "@/api";
import { getCurrentPrayer } from "@/lib/getCurrentPrayer";
import { getSunsetTime } from "@/lib/getSunsetTime";
import SearchableList from "@/salah-web-components/searching";
import { useDataStore } from "@/store/data-store";
import { useQuery } from "@tanstack/react-query";


import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from "react";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const setData = useDataStore(state=>state.setMasjids)
  const setSunset = useDataStore(state=>state.setSunset)
  const { 
    data = [], 
    isLoading, 
    error,
    // refetch,
    isFetching
  } = useQuery({ 
    queryKey: ['masjids'], 
    queryFn: fetchMasjids 
  });
  const {data:sunset} = useQuery({
    queryKey: ['sunset'],
    queryFn:getSunsetTime,
  })
  const {data:currentSalah} = useQuery({
    queryKey: ['currentSalah'],
    queryFn: getCurrentPrayer
  })
  useEffect(() => {
    if (data.length > 0) {
      setData(data);
      setSunset(sunset.results.sunset);
    }
  }, [data, setData]);
  if (isLoading || data.isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: </div>;
  }
  if(isFetching) {
    return <div>Fetching...</div>;
  }
if(!currentSalah)return <div>Unable to load current salah</div>
  
  return (
    <div className="flex flex-col">
      <main>
        <div className="mx-auto px-4 h-[95vh] overflow-y-auto">
          <SearchableList
            data={data}
            currentSalah={currentSalah.currentSalah}
            sunset={sunset.results.sunset}
          />
        </div>
      </main>
    </div>
  )
}