/**
 * Booking Price Calculator
 * 
 * Main function to calculate the total price of a booking
 */

import { Accommodation } from '@/lib/types';
import { PriceBreakdown } from './types';
import { getNightsByType, getTotalNights } from './dateUtils';

export interface CalculateBookingPriceParams {
  accommodation: Accommodation;
  checkIn: Date;
  checkOut: Date;
  pets: number;
}

/**
 * Calculate the complete price breakdown for a booking
 */
export function calculateBookingPrice(
  params: CalculateBookingPriceParams
): PriceBreakdown {
  const { accommodation, checkIn, checkOut, pets } = params;

  // Get nights by type
  const nightsByType = getNightsByType(checkIn, checkOut);
  const totalNights = getTotalNights(checkIn, checkOut);

  // Calculate price for each type of night
  const weekdayTotal = nightsByType.weekday * accommodation.pricing.weekday;
  const weekendTotal = nightsByType.weekend * accommodation.pricing.weekend;
  const highSeasonTotal = nightsByType.highSeason * accommodation.pricing.highSeason;

  // Calculate accommodation total
  const accommodationTotal = weekdayTotal + weekendTotal + highSeasonTotal;

  // Calculate pets fee (per stay, not per night)
  const petsTotal = pets * (accommodation.pricing.pets || 0);

  // Get cleaning fee
  const cleaningFee = accommodation.pricing.cleaning;

  // Calculate total
  const total = accommodationTotal + petsTotal + cleaningFee;

  return {
    nightsBreakdown: {
      weekday: {
        count: nightsByType.weekday,
        pricePerNight: accommodation.pricing.weekday,
        total: weekdayTotal,
      },
      weekend: {
        count: nightsByType.weekend,
        pricePerNight: accommodation.pricing.weekend,
        total: weekendTotal,
      },
      highSeason: {
        count: nightsByType.highSeason,
        pricePerNight: accommodation.pricing.highSeason,
        total: highSeasonTotal,
      },
    },
    accommodationTotal,
    petsTotal,
    cleaningFee,
    total,
    totalNights,
  };
}
