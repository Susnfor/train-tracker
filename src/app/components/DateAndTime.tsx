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
    <div>
        <div>
    <h1>Today&apos;s Date</h1>
          <p>{currentDate}</p>
          <h2>{currentTime}</h2>
    
    </div>
    </div>
  )
}
