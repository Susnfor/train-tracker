"use client"
import { useLineStatusController } from "../controllers/useLineStatusController";

export const LineStatus = () => {
    const { lineStatus, loading, error } = useLineStatusController();

    if (error) return (
        <div className="flex items-center justify-center p-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 dark:text-red-300 font-medium">Error: {error}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Line Status</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Current service information</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">Loading line status...</span>
                        </div>
                    </div>
                )}

                {/* Line Status List */}
                {!loading && lineStatus && lineStatus.map((item: any, index: number) => (
                    <div key={item.id} className="pb-1 w-full">
                        <div className={`text-white collapse border-white dark:border-blue-900 border ${
                            item.name === "Bakerloo" ? 'bg-orange-800':
                            item.name==='Central' ? 'bg-red-600' :  
                            item.name==='Victoria' ? 'bg-sky-400' : 
                            item.name==='Circle' ? 'bg-yellow-400' : 
                            item.name==='District' ? 'bg-green-600' : 
                            item.name==='DLR' ? 'bg-emerald-300' : 
                            item.name==='Elizabeth line' ? 'bg-purple-600' :
                            item.name==='Hammersmith & City' ? 'bg-pink-300' : 
                            item.name==='Jubilee' ? 'bg-slate-500' : 
                            item.name==='Liberty' ? 'bg-gray-500' :
                            item.name==='Lioness' ? 'bg-yellow-500' :
                            item.name==='London Overground' ? 'bg-orange-600' : 
                            item.name==='Metropolitan' ? 'bg-fuchsia-900' : 
                            item.name==='Mildmay' ? 'bg-blue-500' :
                            item.name==='Northern' ? 'bg-black' : 
                            item.name==='Piccadilly' ? 'bg-blue-800' : 
                            item.name==='Suffragette' ? 'bg-emerald-600' :
                            item.name==='Tram' ? 'bg-lime-400' : 
                            item.name==='Waterloo & City' ? 'bg-cyan-500' :
                            item.name==='Weaver' ? 'bg-fuchsia-900' :
                            item.name==='Windrush' ? 'bg-red-600' :
                            'bg-none'
                        }`}>
                            <input type="checkbox" className="peer" /> 
                            <div className='collapse-title peer-checked:text-white-content flex'>
                                <div>{item.severity === 'Good Service' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                )}
                                </div>
                                <div>
                                    <h1 className='text-4xl'>{item.name}</h1>
                                    <h2>{item.severity}</h2>
                                </div>
                            </div>
                            {item.reason && <h2 className='collapse-content peer-checked:text-white-content'>{item.reason}</h2>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
