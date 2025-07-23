"use client";
import { useDisruptionController } from "../controllers/useDisruptionController";

export default function AllDisruptions() {
    const { disruptions, loading, error } = useDisruptionController();

    if (error) return <div>Error: {error}</div>;

    return (
<div className="">
    
      {/* Disruption Board */}
      <div className="alert bg-slate-800 text-white mb-3 md:w-full dark:border-blue-900 " role='alert'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span className="text-center text-1xl">Latest Disruptions</span>
      </div>
      <div className="overflow-y-scroll h-72">

        
        {/* Show loading state */}
        {loading && <div className="text-center p-4 text-white">Loading disruptions...</div>}

        {disruptions && !loading? (
          <div className="text-center p-4 text-white">
            <span>🎉 No disruptions found - all lines running smoothly!</span>
          </div>
        ) : (
          disruptions.map((disruption) => (
            <div key={disruption.id} className="p-1 text-white">
              <div className="collapse border-white dark:border-blue-900 border">
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title peer-checked:bg-error peer-checked:text-white-content">
                  <h1>{disruption.name}</h1>
                  <h2>
                    {disruption.status} from{' '}
                    <span className="font-bold">
                      {disruption.fromDate.toLocaleTimeString("en-US", {
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                  </h2>
                </div>
                {disruption.reason && (
                  <h2 className="collapse-content peer-checked:bg-error peer-checked:text-white-content">
                    {disruption.reason}
                  </h2>
                )}
                {/* More info section shows list of affected stops */}
              </div>
            </div>
          ))
        )}


      </div>
    </div>
    );
}
