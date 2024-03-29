"use client";
import React from "react";
import { useEffect, useState } from "react";


export const SearchLocation = () => {
  const [data, setData] = useState<any>(null);
  const [location, setLocation] = useState<string>("");
  const [mode, setMode] = useState<string>("overground"); //make this a dropdown // overground=default
  const [showStops, setShowStops] = useState<boolean>(false);

  // const [stopPoint, setStopPoint] = useState<any>("");
  const [arrivalData, setArrivalData] = useState<any>(null);

  const [stationData, setStationData] = useState<any>({});
  const [arrivalObject, setArrivalObject] = useState<any>([]);

  const [searched, setSearched] = useState<boolean>(false);

  function secondsToMinutes(seconds: number) {
    return Math.floor(seconds / 60);
  }

  async function fetchFromData() {
    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/Stoppoint/Search/${location}?modes=${mode}`
        // `https://api.tfl.gov.uk/StopPoint/Search?query=${location}&modes=${mode}&app_key=d7ea9b1b04bc415c9a83b3636e9b9213`
      );
      const data: any = await res.json();
      setData(data);
      setSearched(true);
      // setStopPoint(data.matches[0].id);

      // console.log(`The stopoint is set to ${stopPoint}`)

      if (data && data.total > 0) {
        if (data.total > 1) {
          setShowStops(true);
          // return;
        }

        if (data.matches[0].id) {
          StopPointArrival(data.matches[0].id);
          // console.log(`StopPointArrival is called and stopPoint is set`)
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  function StopPointSearchMultiple(item: any) {
    try {
      // setStopPoint(item.id);
      setShowStops(false);
      StopPointArrival(item.id);
      // console.log(`StopPointSearchMultiple is called and stopPoint is set`)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function StopPointArrival(stopPoint: string) {
    try {
      if (stopPoint) {
        //if stopPoint exists, fetch arrival data
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals?app_key=d7ea9b1b04bc415c9a83b3636e9b9213`
        );
        const data: string[] = await res.json();
        setArrivalData(data);
        console.log(`Arrival data is set to ${data}`)
        console.log(data);
        if (data) {
          stationDataMap(data);
        }
      }


    } catch (error: any) {
      throw new Error(error);
    }
  }

  const stationDataMap = (arrivalData: any) => {
    try {
      setStationData({});

      //convert arrivalData into object, key is destination, value is time

      arrivalData.forEach((item: any) => {
        //loop through arrivalData create object
        if (stationData[item.destinationName]) {
          //if key exists, add time to station to array
          stationData[item.destinationName].push(item.timeToStation);
        } else {
          //if key does not exist, create key and add time to station to array
          stationData[item.destinationName] = [item.timeToStation];
        }
        console.log(stationData);
      });
      setArrivalObject(stationData);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <section className="form bg-slate-800 rounded-lg  dark:border-blue-900 border mx-4 my-10 p-2 ">
        <h1 className="text-center text-white">Search for Arrival Time</h1>
        <div className="flex flex-col sm:flex-row mb-5 items-center"> 
          <label  className="input input-bordered flex items-center gap-2 max-w-xs" htmlFor="location"> 
          <input
            type="text"
            className="grow" 
            placeholder="Search a location"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>

          
          
          <label  htmlFor="mode">
          <select
          className="select select-primary w-full max-w-xs"
            name="mode"
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="pick" disabled>Choose a transport method</option>
            <option value="overground">Overground</option>
            <option value="tube">Tube</option>
            <option value="bus">Bus</option>

          </select>
          </label>
          <button className="btn btn-primary" onClick={() => fetchFromData()}>Search</button>
        </div>
        <div>
          {data && showStops ? (
            <div>
              {/* <h1>Stops</h1> */}

              {data.total > 1 ? (
                <div className="text-center ">
                  <h2 >Multiple Stops Found. Please Select A Stop</h2>
                  {data.matches.map((item: any, index: number) => {
                    return (
                      <button className="btn btn-primary mr-3 mb-3 text-white"
                        onClick={() => StopPointSearchMultiple(item)}
                        key={index}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                <div className="alert alert-error w-5/12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span > No stop found </span>
                </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-blue-600 text-white dark:bg-blue-900 rounded-lg m-5">
              {/* <h1>Show Arrivals</h1> */}

              {arrivalObject &&
                Object.keys(arrivalObject).map((item: any, index: number) => {
                  return (
             
                    <div key={index} className="flex flex-col justify-center items-center  ">
                      <h1>{item}</h1>
                      {/* if any values == NaN dont show them*/}
                      <h2>{isNaN(arrivalObject[item][0]) === true ? '': secondsToMinutes(arrivalObject[item][0]) === 0 ?  'due' : secondsToMinutes(arrivalObject[item][0]) + ' min'}</h2>
                      <h2>{isNaN(arrivalObject[item][1]) === true ? '': secondsToMinutes(arrivalObject[item][1]) === 0 ?  'due' : secondsToMinutes(arrivalObject[item][1]) + ' min'}</h2>
                      <h2>{isNaN(arrivalObject[item][2]) === true ? '': secondsToMinutes(arrivalObject[item][0]) === 0 ?  'due' : secondsToMinutes(arrivalObject[item][2]) + ' min'}</h2>
                    </div>
                  
                  );
                })}
            </div>
          )

      
          
          }
          {/*if arrivalObject is empty, show no stop times available , maybe put something to check if search button clicked*/}
          {Object.keys(arrivalObject).length <= 0 && searched ? (
            <div className="flex justify-center items-center ">
            <div className="alert alert-error w-5/12 ">
               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-center"> No stop times available  </span>
          </div>
          </div>
          ): ''}

        </div>
      </section>
    </div>
  );
};
