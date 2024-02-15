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
  const [arrivalObject, setArrivalObject] = useState<any>();

  const [isArrivals, setIsArrivals] = useState<boolean>(true);

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
        // console.log(`Arrival data is set to ${data}`)
        if (data) {
          stationDataMap(data);
        }
      }

      // if (data.destinationName) {
      //   setIsArrivals(false);
      // } else {
      //   setIsArrivals(true);
      // }
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
      <section className="form">
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
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="overground">Overground</option>
            <option value="tube">Tube</option>
            <option value="bus">Bus</option>

          </select>
          <button className="btn btn-primary" onClick={() => fetchFromData()}>Search</button>
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
                      <button className="btn btn-primary"
                        onClick={() => StopPointSearchMultiple(item)}
                        key={index}
                      >
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
              {/* <h1>Show Arrivals</h1> */}

              {arrivalObject &&
                Object.keys(arrivalObject).map((item: any, index: number) => {
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
          )

      
          
          }
          {
            isArrivals ? (<h1></h1>): (<h1> No stop times available  </h1>)
          }
        </div>
      </section>
    </div>
  );
};
