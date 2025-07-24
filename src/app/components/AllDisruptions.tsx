"use client";
import { useDisruptionController } from "../controllers/useDisruptionController";

export default function AllDisruptions() {
    const { disruptions, loading, error } = useDisruptionController();

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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Updates</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Latest disruption information</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">Loading updates...</span>
                        </div>
                    </div>
                )}

                {/* No disruptions */}
                {!loading && disruptions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">All Good!</h3>
                        <p className="text-gray-500 dark:text-gray-400">No disruptions found - all lines running smoothly</p>
                    </div>
                )}

                {/* Disruptions list */}
                {!loading && disruptions && Array.isArray(disruptions) && disruptions.length > 0 && disruptions.map((disruption) => (
                    <div key={disruption.id} className="group">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border border-red-200 dark:border-red-800/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                            <details className="group">
                                <summary className="p-6 cursor-pointer select-none hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-open:text-red-600 dark:group-open:text-red-400 transition-colors">
                                                {disruption.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full font-medium">
                                                    {disruption.status}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    from {disruption.fromDate.toLocaleTimeString("en-US", {
                                                        hour: '2-digit', 
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 ml-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </summary>
                                {disruption.reason && (
                                    <div className="px-6 pb-6 pt-0">
                                        <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-red-100 dark:border-red-800/20">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {disruption.reason}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </details>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
