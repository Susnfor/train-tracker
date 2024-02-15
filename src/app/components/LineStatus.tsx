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
                    <div key={item.id} className={
                      item.name === "Bakerloo" ? 'bg-orange-800':
                      item.name==='Central' ? 'bg-red-600' :  
                      item.name==='Victoria' ? 'bg-sky-400' : 
                      item.name==='Circle' ? 'bg-yellow-400' : 
                      item.name==='District' ? 'bg-green-600' : 
                      item.name==='DLR' ? 'bg-emerald-300' : 
                      item.name==='Elizabeth line' ? 'bg-purple-600' :
                      item.name==='Hammersmith & City' ? 'bg-pink-300' : 
                      item.name==='Jubilee' ? 'bg-slate-500' : 
                      item.name==='London Overground' ? 'bg-orange-600' : 
                      item.name==='Metropolitan' ? 'bg-fuchsia-900' : 
                      item.name==='Northern' ? 'bg-black' : 
                      item.name==='Piccadilly' ? 'bg-blue-800' : 
                      item.name==='Tram' ? 'bg-lime-400' : 
                      item.name==='Waterloo & City' ? 'bg-cyan-500' : 

                      'bg-none'}>

                        <div className='text-white collapse'>
                        <input type="checkbox" className="peer" /> 
                        <div className='collapse-title peer-checked:text-secondary-content'>
              
                        <h1>{item.name}</h1>
                        <h2>{item.lineStatuses[0].statusSeverityDescription}</h2>
                        </div>
                        <h2 className='collapse-content peer-checked:text-secondary-content'>{item.lineStatuses[0].reason}</h2>
                        {/* More info section shows list of affected stops */}
                        </div>
                    </div>
                );
            })
        }
    </div></div>
  )
}
