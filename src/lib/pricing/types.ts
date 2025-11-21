/**
 * Pricing Types
 * 
 * Type definitions for the booking pricing system
 */

export type DayType = 'weekday' | 'weekend' | 'highSeason';

export interface NightsByType {
  weekday: number;
  weekend: number;
  highSeason: number;
}

export interface NightsBreakdownItem {
  count: number;
  pricePerNight: number;
  total: number;
}

export interface PriceBreakdown {
  nightsBreakdown: {
    weekday: NightsBreakdownItem;
    weekend: NightsBreakdownItem;
    highSeason: NightsBreakdownItem;
  };
  accommodationTotal: number;
  petsTotal: number;
  cleaningFee: number;
  total: number;
  totalNights: number;
}

export interface HighSeasonPeriod {
  name: string;
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  year?: number; // Optional, for year-specific dates like Easter
}
