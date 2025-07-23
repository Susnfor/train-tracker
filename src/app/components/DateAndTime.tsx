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
   
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {  hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className='flex justify-center'>
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 w-full max-w-md mx-auto text-center hover:shadow-3xl transition-all duration-500'>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Current Time</h1>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800/30">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentDate}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-purple-100 dark:border-purple-800/30">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">{currentTime}</h2>
            </div>
          </div>
        </div>
    </div>
  )
}
