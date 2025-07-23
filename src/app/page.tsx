// import React from "react";
import AllDisruptions from "./components/AllDisruptions";
import { DateAndTime } from "./components/DateAndTime";
import { LineStatus } from "./components/LineStatus";
import { SearchLocation } from "./components/SearchLocation";
import Image from "next/image";
import bg from "./assets/bgtrain.jpeg";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
			{/* Background Image */}
			<div className="fixed inset-0 z-0">
				<Image
					src={bg}
					alt="Train background"
					className="w-full h-full object-cover opacity-20 dark:opacity-10"
					priority
				/>
			</div>

			{/* Main Content */}
			<div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
						Train Tracker
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
						Real-time London transport information
					</p>
				</div>

				{/* Primary Action: Search - Most Important */}
				<div className="mb-8">
					<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden hover:shadow-3xl transition-all duration-500">
						<SearchLocation />
					</div>
				</div>

				{/* Secondary Information Grid */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					{/* Left Column: Status Information */}
					<div className="xl:col-span-2 space-y-8">
						{/* Line Status - Quick Overview */}
						<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-3xl transition-all duration-500">
							<LineStatus />
						</div>

						{/* Disruptions - Detailed Information */}
						<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-3xl transition-all duration-500">
							<AllDisruptions />
						</div>
					</div>

					{/* Right Column: Utility Information */}
					<div className="xl:col-span-1">
						<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 sticky top-8 hover:shadow-3xl transition-all duration-500">
							<DateAndTime />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
