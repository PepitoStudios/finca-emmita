/**
 * useBookingPrice Hook
 * 
 * Custom hook to calculate booking price reactively
 */

import { useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { Accommodation } from '@/lib/types';
import { calculateBookingPrice } from '@/lib/pricing/calculateBookingPrice';
import { PriceBreakdown } from '@/lib/pricing/types';

export interface UseBookingPriceResult {
  priceBreakdown: PriceBreakdown | null;
  totalNights: number;
  isValid: boolean;
}

/**
 * Hook to calculate booking price based on accommodation, dates, and pets
 */
export function useBookingPrice(
  accommodation: Accommodation | undefined,
  dateRange: DateRange | undefined,
  pets: number
): UseBookingPriceResult {
  const result = useMemo(() => {
    // Validate inputs
    if (!accommodation || !dateRange?.from || !dateRange?.to) {
      return {
        priceBreakdown: null,
        totalNights: 0,
        isValid: false,
      };
    }

    // Calculate price
    const priceBreakdown = calculateBookingPrice({
      accommodation,
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      pets,
    });

    return {
      priceBreakdown,
      totalNights: priceBreakdown.totalNights,
      isValid: priceBreakdown.totalNights > 0,
    };
  }, [accommodation, dateRange?.from, dateRange?.to, pets]);

  return result;
}
