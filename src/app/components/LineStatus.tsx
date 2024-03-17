"use client"
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
    <div className="p-0 m-0" >
        <div className=" flex flex-col items-center mb-5">

        {
            data && data.map((item: any, index: number) => {
                return (
                    <div key={item.id} className={
                      ` pb-1 w-10/12`}>

                        <div className={`text-white collapse ${
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
                      'bg-none'}`}>
                        <input type="checkbox" className="peer" /> 



                        <div className='collapse-title peer-checked:text-white-content flex'>

                        <div>{item.lineStatuses[0].statusSeverityDescription === 'Good Service' ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}</div>

<div>
                          <h1 className='text-4xl'>{item.name}</h1>
                        <h2>{item.lineStatuses[0].statusSeverityDescription}</h2>
                        </div>
                        </div>
                        <h2 className='collapse-content peer-checked:text-white-content'>{item.lineStatuses[0].reason}</h2>
                        {/* More info section shows list of affected stops */}
                        </div>

                    </div>
                );
            })
        }
    </div></div>
  )
}
