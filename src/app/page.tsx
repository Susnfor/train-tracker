// import React from "react";
import AllDisruptions from "./components/AllDisruptions";
import { DateAndTime } from "./components/DateAndTime";
import { LineStatus } from "./components/LineStatus";
import { SearchLocation } from "./components/SearchLocation";
import Image from 'next/image'
import bg from './assets/bgtrain.jpeg'

export default function Home() {
  return (
    <main className="mb-24 flex justify-center top-0 relative">
    {/*Plan
    TFL/ Train-Bus Tracker
    import the api 
    display the services / if down/  what problem

    put in location/ train stop (drop down?)
    try and find if there is a stop that includes that name
    if multiple stops with that name, display all stops with that name
    display trains at that stop and time
    display if there are any delays
    display bus stops near that location???
    go back to home page to search again
    */}
    <div className="fixed w-full ">
    <Image src={bg} alt="bg" className="invisible sm:visible w-full object-cover object-center absolute  brightness-50" />
    </div>
  

    <div className="z-10 bg-white/10 backdrop-blur-md shadow-xl rounded-md w-11/12 my-16">
      <div >
      <DateAndTime />
      </div>

  <div className=" flex justify-center md:flex-row flex-col ">
    

    <div>
    <div className="px-3">
      <AllDisruptions />
    </div>
    <div >
    <SearchLocation />
    </div>

    </div>

    <div>
    <LineStatus />
    </div>
  </div>


    


    </div>
    </main>
  )
}
