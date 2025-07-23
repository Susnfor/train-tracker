"use client";
import { useEffect, useState } from "react";
import {fetchLineStatus, processLineStatus, ProcessedLineStatus} from "@/app/services/lineStatusService";

export const useLineStatusController = () => { 
    const [lineStatus, setLineStatus] = useState<ProcessedLineStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadLineStatus = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch line status using service
            const data = await fetchLineStatus();
            const processedData = processLineStatus(data);
            if (!processedData || processedData.length === 0) {
                console.log("No line status found");
                setLineStatus([]);
                return;
            }
            setLineStatus(processedData);
        } catch (error) {
            console.error("Error fetching line status:", error);
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLineStatus();
    }, []); // runs once

    return { 
        lineStatus, 
        loading, 
        error 
    };

}