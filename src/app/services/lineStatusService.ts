import {get} from "@/app/lib/apiRequest";

//types 
interface ProcessedLineStatus {
    id: string;
    name: string;
    severity: string;
    reason?: string;}


//fetch line status data from the API using the get function
export const fetchLineStatus = async () => {
    return get('api/lineStatus');
}
// process the line status data to match the ProcessedLineStatus type
export const processLineStatus = (data: any[]): ProcessedLineStatus[] => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        severity: item.lineStatuses[0].statusSeverityDescription,
        reason: item.lineStatuses[0].reason,
    }));
}