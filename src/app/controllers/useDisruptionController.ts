"use client";
import { useEffect, useState } from "react";
import { fetchDisruptions, processDisruptions, ProcessedDisruption} from "@/app/services/disruptionService";

export const useDisruptionController = () => {
	const [disruptions, setDisruptions] = useState<ProcessedDisruption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const loadDisruptions = async () => {
		setLoading(true);
		setError(null);
		try {
			//fetch disruptions using service
			const data = await fetchDisruptions();
			const processedData = processDisruptions(data);
			if (!processedData || processedData.length === 0) {
				console.log("No disruptions found");
                setDisruptions([]);
				return;
			}
			setDisruptions(processedData);
		} catch (error) {
			console.error("Error fetching disruptions:", error);
			setError(error instanceof Error ? error.message : String(error));
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		loadDisruptions();
	}, []); // runs once
	return { 
		disruptions, 
		loading, 
		error, 
		loadDisruptions 
	};
};
