import { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { 
  calculateQiblahDirection, 
  getCardinalDirection, 
  formatQiblahDirection 
} from '@/lib/qiblahUtils';

export interface QiblahData {
  degrees: number;
  cardinal: string;
  formatted: string;
  isValid: boolean;
}

/**
 * Custom hook to calculate and provide Qiblah direction data
 * based on the user's configured location settings
 */
export function useQiblah(): QiblahData {
  const { settings } = useApp();
  const { latitude, longitude } = settings.location;

  return useMemo(() => {
    // Check if location is properly set (not default 0,0)
    const isValid = latitude !== 0 || longitude !== 0;
    
    if (!isValid) {
      return { 
        degrees: 0, 
        cardinal: 'N', 
        formatted: 'N/A', 
        isValid: false 
      };
    }

    const degrees = calculateQiblahDirection(latitude, longitude);
    
    return {
      degrees,
      cardinal: getCardinalDirection(degrees),
      formatted: formatQiblahDirection(degrees),
      isValid: true,
    };
  }, [latitude, longitude]);
}
