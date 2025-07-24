import { get } from '@/app/lib/apiRequest';

//types 

export interface ProcessedDisruption {
  id: string;
  name: string;
  status: string;
  severity: number;
  reason?: string;
  fromDate: Date;
}

export const fetchDisruptions = async () => { 
return get('/api/allDisruptions');
}

export const processDisruptions = (data: any[]): ProcessedDisruption[] => {
  // Add comprehensive input validation
  if (!data || !Array.isArray(data)) {
    console.log('Invalid data received in processDisruptions:', data);
    return [];
  }
  
  try {
    // Filter out items with severity less than 10, with comprehensive null checks
    const filteredData = data.filter(item => {
      // Check if item exists and has required structure
      if (!item || !item.lineStatuses || !Array.isArray(item.lineStatuses)) {
        return false;
      }
      
      // Check if lineStatuses has at least one item
      if (item.lineStatuses.length === 0) {
        return false;
      }
      
      // Check if first lineStatus exists and has statusSeverity
      const firstLineStatus = item.lineStatuses[0];
      if (!firstLineStatus || typeof firstLineStatus.statusSeverity !== 'number') {
        return false;
      }
      
      // Check if item has valid id and name (don't show unknown/invalid data)
      if (!item.id || !item.name || item.id === 'unknown' || item.name === 'Unknown Line') {
        return false;
      }
      
      return firstLineStatus.statusSeverity < 10; // 10 == good service, less than 10 indicates some disruption
    });
    
    return filteredData.map((item) => {
      const lineStatus = item.lineStatuses[0];
      const validityPeriod = lineStatus?.validityPeriods && 
                            Array.isArray(lineStatus.validityPeriods) && 
                            lineStatus.validityPeriods.length > 0 
        ? lineStatus.validityPeriods[0] 
        : null;
        
      return {
        id: item.id,
        name: item.name,
        status: lineStatus?.statusSeverityDescription || 'Service Issue',
        severity: lineStatus?.statusSeverity || 0,
        reason: lineStatus?.reason || '',
        fromDate: validityPeriod?.fromDate 
          ? new Date(validityPeriod.fromDate) 
          : new Date()
      };
    }).sort((a, b) => a.severity - b.severity);
    
  } catch (error) {
    console.error('Error processing disruptions:', error);
    return [];
  }
}