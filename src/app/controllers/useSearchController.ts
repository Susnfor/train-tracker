"use client";
import { useState } from "react";
import {searchRequest, searchStoppoint, SearchQuery} from "@/app/services/searchService";

export const useSearchController = () => {
    const [searchResults, setSearchResults] = useState<any>(null);
    const [arrivalObject, setArrivalObject] = useState<any>({});
    const [showStops, setShowStops] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async ({ location, mode }: SearchQuery) => {
        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const data = await searchRequest({ location, mode });
            setSearchResults(data);
            
            if (data && data.total > 0) {
                if (data.total > 1) {
                    setShowStops(true);
                } else if (data.matches[0].id) {
                    await fetchStopPointArrival(data.matches[0].id);
                }
            }
        } catch (error) {
            console.error("Error searching:", error);
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    };

    const selectStop = async (stopId: string) => {
        setShowStops(false);
        await fetchStopPointArrival(stopId);
    };

    const fetchStopPointArrival = async (stopPoint: string) => {
        try {
            if (stopPoint) {
                const data = await searchStoppoint(stopPoint);
                if (data) {
                    mapStationData(data);
                }
            }
        } catch (error) {
            console.error("Error fetching arrivals:", error);
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    const mapStationData = (arrivalData: any) => {
        try {
            const newStationData: any = {};
            
            arrivalData.forEach((item: any) => {
                if (newStationData[item.destinationName]) {
                    newStationData[item.destinationName].push(item.timeToStation);
                } else {
                    newStationData[item.destinationName] = [item.timeToStation];
                }
            });
            setArrivalObject(newStationData);
        } catch (error) {
            console.error("Error mapping station data:", error);
            setError(error instanceof Error ? error.message : String(error));
        }
    };

    return { 
        searchResults, 
        arrivalObject,
        showStops,
        searched,
        loading, 
        error, 
        search,
        selectStop
    };
};
