import { get } from '@/app/lib/apiRequest';

//types 

interface ProcessedDisruption {
  id: string;
  name: string;
  status: string;
  severity: number;
  reason?: string;
  fromDate: Date;
}

export const fetchDisruptions = async () => { 
return get('api/allDisruptions');
}

export const processDisruptions = (data: any[]): ProcessedDisruption[] => {
  data = data.filter(item => item.lineStatuses[0]?.statusSeverity < 10); // Filter out items with severity less than 10
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.lineStatuses[0].statusSeverityDescription,
    severity: item.lineStatuses[0].statusSeverity,
    reason: item.lineStatuses[0].reason || '',
    fromDate: new Date(item.lineStatuses[0].validityPeriods[0].fromDate.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'
}))
  }));
}