"use client";
import React from "react";
import { useState } from "react";
import { useSearchController } from "../controllers/useSearchController";

export const SearchLocation = () => {
  const { 
    searchResults, 
    arrivalObject, 
    showStops, 
    searched, 
    loading, 
    error, 
    search, 
    selectStop 
  } = useSearchController();

  const [location, setLocation] = useState<string>("");
  const [mode, setMode] = useState<string>("overground");

  function secondsToMinutes(seconds: number) {
    return Math.floor(seconds / 60);
  }

  async function fetchFromData() {
    try {
      await search({ location, mode });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  function StopPointSearchMultiple(item: any) {
    try {
      selectStop(item.id);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
            <circle cx="11" cy="8" r="2"></circle>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Arrivals</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Search for real-time departure information</p>
        </div>
      </div>
      
      {/* Show error state */}
      {error && (
        <div className="alert alert-error mb-4 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      )}
      
      {/* Search Form */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Location Input */}
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Station or Stop</span>
            </label>
            <input
              type="text"
              placeholder="Enter location name..."
              className="input input-bordered input-lg rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Transport Mode Select */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Transport</span>
            </label>
            <select
              className="select select-bordered select-lg rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 min-w-[160px]"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="overground">🚆 Overground</option>
              <option value="tube">🚇 Tube</option>
              <option value="dlr">🚊 DLR</option>
              <option value="elizabeth-line">🟣 Elizabeth Line</option>
              <option value="tram">🚋 Tram</option>
              <option value="bus">🚌 Bus</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            className={`btn btn-lg rounded-xl min-w-[120px] ${loading 
              ? 'btn-disabled loading' 
              : 'btn-primary bg-gradient-to-r from-green-500 to-emerald-600 border-none hover:from-green-600 hover:to-emerald-700'
            }`}
            onClick={fetchFromData}
            disabled={loading || !location.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <p className="flex items-center text-gray-50">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35"/>
                  <circle cx="11" cy="11" r="3" strokeWidth="1.5"/>
                </svg>
                Search
              </p>
            )}
          </button>
        </div>
      </div>

      {/* Multiple Stops Selection */}
      {searchResults && showStops && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multiple Stops Found</h3>
            <p className="text-gray-500 dark:text-gray-400">Select the stop you&apos;re looking for</p>
          </div>
          
          {searchResults && searchResults.total > 1 && searchResults.matches ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matches.map((item: any, index: number) => (
                <button
                  key={index}
                  className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => StopPointSearchMultiple(item)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select this stop</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No stops found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try searching with a different location name</p>
            </div>
          )}
        </div>
      )}

      {/* Live Arrivals Display */}
      {!showStops && Object.keys(arrivalObject).length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg mb-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Live Arrivals</h3>
            <p className="text-gray-500 dark:text-gray-400">Next departures from this stop</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.keys(arrivalObject).map((destination: string, index: number) => (
              <div key={index} className="card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{destination}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Platform times</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {arrivalObject[destination] && arrivalObject[destination].slice(0, 3).map((timeToStation: number, timeIndex: number) => (
                    <div key={timeIndex} className="text-center">
                      {!isNaN(timeToStation) && (
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 border border-green-100 dark:border-green-800/30 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {secondsToMinutes(timeToStation) === 0 ? 'Due' : `${secondsToMinutes(timeToStation)}`}
                          </div>
                          {secondsToMinutes(timeToStation) !== 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">min</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {Object.keys(arrivalObject).length === 0 && searched && !showStops && !loading && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.386 0-4.735.832-6.566 2.291" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No departures available</h3>
          <p className="text-gray-500 dark:text-gray-400">There are currently no scheduled departures for this location</p>
        </div>
      )}
    </div>
  );
};
