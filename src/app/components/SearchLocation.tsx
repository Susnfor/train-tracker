"use client";
import React from 'react'
import { useEffect, useState } from "react";

export const SearchLocation = () => {
    const [data, setData] = useState<any>(null);
    const [location, setLocation] = useState<string>("dalston");
    const [mode, setMode] = useState<string>("overground"); //make this a dropdown

    async function fetchFromData() {
        try {
          const res = await fetch(
            `https://api.tfl.gov.uk/Stoppoint/Search/${location}?modes=${mode}`
          );
          const data: string[] = await res.json();
          setData(data);
        } catch (error: any) {
          throw new Error(error);
        }
      }
    useEffect(() => {
        fetchFromData();
    
      }, []);    
  return (
    <div>
        <section className='form'>
        <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="mode">Mode</label>
        <select
          name="mode"
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}>
        <option value="overground">Overground</option>
        <option value="tube">Tube</option>
        <option value="bus">Bus</option>
        {/* <option value="national-rail">National Rail</option>
        <option value="dlr">DLR</option>
        <option value="tram">Tram</option>  */}
        </select>
        <button onClick={fetchFromData}>Search</button>
        </div>
        <div>
        {data && data.total > 0 ? (
            <div>
                <h1>Stops</h1>
                <select>
               
                    {data.matches > 1 ? (data.matches.map((item: any, index: number) => {
                        return (
                            <option key={index}>{item.name}</option>
                        )
                    }))
                    : ( <option>{data.matches[0].name}</option>)}
                
                </select>
            </div>
        ) : (
            <div>
                <h1>No Stops Found</h1>
            </div>
        )}
        

        </div>

        </section>
        </div>
  )
}
