"use client";
import React, { useEffect, useState } from "react";

export default function ServicesStatus() {
  //import the api
  //tube + national rail
  //live map?
  //disruptions? https://api-ganges.tfl.gov.uk/StopPoint/Mode/tube,dlr,overground,elizabeth-line,tram/Disruption?app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c80
  //status? https://api-ganges.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status?detail=true&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804
  //status board ? ttps://tfl.gov.uk/StatusUpdates/StatusBoard?modes=tube,dlr,overground,elizabeth-line,tram&collapsed=False&isHomeOrModePageStatusBoard=False&isStatusUpdatesPage=True&isFavouritesPanel=False&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804
  //maybe visual map? --- ai -> https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Route/Sequence/inbound?serviceTypes=Regular&excludeCrowding=True&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804

  const [data, setData] = useState<any>(null);


  async function fetchTrainData() {
    try {
      const res = await fetch(
        "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Disruption?app_key=d7ea9b1b04bc415c9a83b3636e9b9213"
      );
      const data: string[] = await res.json();
      setData(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchTrainData();
  }, []);


  return (
    <div>
    
      {/* Status Board */}
      <h1>Services Status</h1>
      <div>
        {data &&
          data.map((item: any, index: number) => {
            return (
              <div key={item.id}>
                <h1>{item.closureText}</h1>
                <h2>{item.description}</h2>
              </div>
            );
          })}


      </div>
    </div>
  );
}
