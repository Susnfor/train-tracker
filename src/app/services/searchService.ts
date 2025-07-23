import {post} from '@/app/lib/apiRequest';

//types
interface SearchQuery {
    location: string;
    mode?: string;
}

interface ProcessedSearchResponse {
    id: string;
    name: string;
}

interface ProcessedStoppointArrival {
    stoppointId: string;
    destination: string;
    timeToStation: number;
    direction: string;
    vehicleId: string;
    timing: {}; 
}

// searching for a location
export const searchRequest = async (data: SearchQuery) => {
    return post('api/searchLocation', data);
}

export const processSearchResponse = (data: any[]): ProcessedSearchResponse[] => {
    return data.map((item) => ({
        id: item.id,
        name: item.name
    }));
}

// now search for a stoppoint arrival times in the named location 
export const searchStoppoint = async (stoppointId: string) => {
    return post('api/stoppointArrival', { stoppointId });
}
export const processStoppointResponse = (data: any[]): ProcessedStoppointArrival[] => {
    return data.map((item) => ({
        stoppointId: item.id,
        destination: item.destinationName,
        timeToStation: item.timeToStation,
        direction: item.direction,
        vehicleId: item.vehicleId,
        timing: item.timing,
    }));
}