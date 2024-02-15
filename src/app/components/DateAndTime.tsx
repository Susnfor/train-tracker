"use client";
import React from 'react'
import { useEffect, useState } from "react";


export const DateAndTime = () => {
 //get date
 function getDate(): string {
    const today = new Date();
    const month: number = today.getMonth() + 1;
    const year: number = today.getFullYear();
    const date: number = today.getDate();
    return `${date}/${month}/${year}`;
  }

  const [currentDate, setCurrentDate]: any = useState(getDate());
  const [currentTime, setCurrentTime]: Array<any> = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {  hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className='flex justify-center p-5 text-center text-2xl'>
        <div className='bg-black rounded w-5/12 text-slate-50 p-5'>
    <h1>Today&apos;s Date</h1>
          <p>{currentDate}</p>
          <h2 className=''>{currentTime}</h2>
    
    </div>
    </div>
  )
}
