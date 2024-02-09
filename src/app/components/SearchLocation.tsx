"use client";
import React from 'react'
import { useEffect, useState } from "react";

export const SearchLocation = () => {
    const [data, setData] = useState<any>(null);
    const [location, setLocation] = useState<string>("");
    const [mode, setMode] = useState<string>("overground"); //make this a dropdown
    const [showStops, setShowStops] = useState<boolean>(false);

    const [stopPoint, setStopPoint] = useState<any>("910GDALSKLD"); 
    const [arrivalData, setArrivalData] = useState<any>(null);

    const [stationData, setStationData] = useState<any>({});
    const [arrivalObject, setArrivalObject] = useState<any>();

   
    
    function secondsToMinutes(seconds: number) {
        return Math.floor(seconds / 60);
    }

    async function fetchFromData() {
        try {
          setArrivalData(null); //clear arrival data when searching for new location
          const res = await fetch(
            `https://api.tfl.gov.uk/Stoppoint/Search/${location}?modes=${mode}`
          );
          const data: any = await res.json();
          setData(data);
          if (data && data.total > 0) {
            if (data.total > 1) {
              setShowStops(true);
            }
            setStopPoint(data.matches[0].id);
            console.log(data.matches[0].id);
            StopPointArrival();
          
          }
        } catch (error: any) {
          throw new Error(error);
        }
      }

      

      async function StopPointSearchMultiple() {
        try {
          setStopPoint(data.matches[0].id)
          setShowStops(false);
          StopPointArrival();
        } catch (error: any) {
          throw new Error(error);
        }
      }

      
      async function StopPointArrival() {
        try {
          const res = await fetch(
            `https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals?app_key=d7ea9b1b04bc415c9a83b3636e9b9213`
          );
          const data: string[] = await res.json();
          setArrivalData(data);
          if (arrivalData){
        stationDataMap()};
        } catch (error: any) {
          throw new Error(error);
        }
      }
      
      const stationDataMap = () => {
        //convert arrivalData into object, key is destination, value is time
        
        arrivalData.forEach((item: any) => { //loop through arrivalData create object
          if (stationData[item.destinationName]) { //if key exists, add time to station to array
            stationData[item.destinationName].push(item.timeToStation);
          } else { //if key does not exist, create key and add time to station to array
            stationData[item.destinationName] = [item.timeToStation];
          }
          
        });
        setArrivalObject(stationData);
        console.log(arrivalObject);
        
        
      }


    useEffect(() => {
        fetchFromData();
    
      }, []);    
  return (
    <div>
        <section className='form'>
        <h1>Search for Arrival Time</h1>
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
        {data && showStops ? (
            <div>
                <h1>Stops</h1>
               

                
              {data.total > 1 ? (
                <div>
                  <h2>Multiple Stops Found, Please click the one you want</h2>
                  {data.matches.map((item: any, index: number) => {
                    return (
                      <button onClick={() => StopPointSearchMultiple()} key={index}>
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <h2>No stop Found</h2>
              )}
                
                
            </div>
        ) : (
            <div>
                <h1>Show Arrivals</h1>
                {/* so create hashmap, add linename + time to station, if lineman exists just add time to slow*/}
                {/* {arrivalData && arrivalData.map((item: any, index: number) => {
                    return (
                        <div key={item.id}>
                            <h1>{item.lineName}</h1>
                            <h2>{item.destinationName}</h2>
                            <h2>{secondsToMinutes(item.timeToStation)}</h2>
                        </div>
                    );
                })} */}
                {arrivalObject && Object.keys(arrivalObject).map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            <h1>{item}</h1>
                            <h2>{secondsToMinutes(arrivalObject[item][0])}</h2>
                            <h2>{secondsToMinutes(arrivalObject[item][1])}</h2>
                            <h2>{secondsToMinutes(arrivalObject[item][2])}</h2>
                        </div>
                    );
                })}
            </div>
        )}
        

        </div>

        </section>
        </div>
  )
}
