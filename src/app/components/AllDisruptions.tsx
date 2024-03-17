"use client";
import React, { useEffect, useState } from "react";

export default function AllDisruptions() {
  //import the api
  //tube + national rail
  //live map?
  //disruptions? https://api-ganges.tfl.gov.uk/StopPoint/Mode/tube,dlr,overground,elizabeth-line,tram/Disruption?app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c80
  //status? https://api-ganges.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status?detail=true&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804
  //status board ? ttps://tfl.gov.uk/StatusUpdates/StatusBoard?modes=tube,dlr,overground,elizabeth-line,tram&collapsed=False&isHomeOrModePageStatusBoard=False&isStatusUpdatesPage=True&isFavouritesPanel=False&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804
  //maybe visual map? --- ai -> https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Route/Sequence/inbound?serviceTypes=Regular&excludeCrowding=True&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804

  const [data, setData] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);


  // async function fetchTrainData() {
  //   try {
  //     const res = await fetch(
  //       "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Disruption?app_key=d7ea9b1b04bc415c9a83b3636e9b9213"
  //     );
  //     const data: string[] = await res.json();
  //     setData(data);
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }

  async function fetchFromDate() {
    try {
      const res = await fetch(
        "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status?detail=true&app_key=14f7f5ff5d64df2e88701cef2049c804"
      );
      const data: string[] = await res.json();
      setFromDate(data);
      // console.log(data);
    } catch (error: any) {
      // console.log(error);
      throw new Error(error);
    }
  }



  useEffect(() => {
    // fetchTrainData();
    fetchFromDate();

  }, []);


  return (
    <div>
    
      {/* Disruption Board */}
      <div className="alert bg-slate-800 text-white mb-3 md:w-full dark:border-blue-900 " role='alert'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span className="text-center text-1xl">Latest Disruptions</span>
      </div>
      <div className="overflow-y-scroll h-72">
      

{
            fromDate && fromDate.map((item: any) => {
            
              if (item.lineStatuses[0].statusSeverity < 10 )
            // const [date, setDate] = useState<any>(null);
          // var date = new Date(item.lineStatuses[0].validityPeriods[0].fromDate)

            // }
              
                return (
                  <div className="p-1 text-white ">
                  <div key={item.id} className="collapse border-white dark:border-blue-900 border">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title   peer-checked:bg-error peer-checked:text-white-content">
                    <h1 >{item.name}</h1>
                    <h2>{item.lineStatuses[0].statusSeverityDescription} from <span className="font-bold">{new Date(item.lineStatuses[0].validityPeriods[0].fromDate).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'
})}</span></h2>
</div>
                    <h2 className="collapse-content peer-checked:bg-error peer-checked:text-white-content" >{item.lineStatuses[0].reason}</h2>
                    
                {/* More info section shows list of affected stops */}
                    </div>
                    </div>
                  
                  
                );
            })
        }


      </div>
    </div>
  );
}
