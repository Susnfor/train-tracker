"use client";
import { useState } from "react";
import {searchRequest, processSearchResponse, SearchQuery, ProcessedSearchResponse} from "@/app/services/searchService";

export const useSearchController = () => {
    const [searchResults, setSearchResults] = useState<ProcessedSearchResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const search = async ({ location, mode }: SearchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchRequest({ location, mode });
            const processedData = processSearchResponse(data);
            setSearchResults(processedData);
        } catch (error) {
            console.error("Error searching:", error);
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setLoading(false);
        }
    };

    return { 
        searchResults, 
        loading, 
        error, 
        search 
    };
};
