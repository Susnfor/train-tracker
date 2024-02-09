"use client"
import React from 'react'
import { useEffect, useState } from "react";

export const LineStatus = () => {
    const [data, setData] = useState<any>(null);


  async function fetchLineData() {
    try {
      const res = await fetch(
        "https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line,tram/Status?detail=true&app_key=14f7f5ff5d64df2e88701cef2049c804"
      );
      const data: string[] = await res.json();
      setData(data);
      // console.log(data);
    } catch (error: any) {
      // console.log(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchLineData();
  }, []);



  return (
    <div>
        <div>
            {/* Inspo: https://tubestatus.net/ css */}
        <h1>Lines</h1>
        {
            data && data.map((item: any, index: number) => {
                return (
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                        <h2>{item.lineStatuses[0].statusSeverityDescription}</h2>
                        <h2>{item.lineStatuses[0].reason}</h2>
                        {/* More info section shows list of affected stops */}
                    </div>
                );
            })
        }
    </div></div>
  )
}
