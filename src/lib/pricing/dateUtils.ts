/**
 * Date Utilities for Pricing
 * 
 * Functions to classify dates and calculate nights by type
 */

import { DayType, HighSeasonPeriod, NightsByType } from './types';

/**
 * High season periods configuration
 * These can be moved to a database in the future
 */
export const HIGH_SEASON_PERIODS: HighSeasonPeriod[] = [
  // July
  {
    name: 'July',
    startMonth: 7,
    startDay: 1,
    endMonth: 7,
    endDay: 31,
  },
  // August
  {
    name: 'August',
    startMonth: 8,
    startDay: 1,
    endMonth: 8,
    endDay: 31,
  },
  // San Juan (June 23-24)
  {
    name: 'San Juan',
    startMonth: 6,
    startDay: 23,
    endMonth: 6,
    endDay: 24,
  },
  // Christmas (Dec 24 - Jan 6)
  {
    name: 'Christmas',
    startMonth: 12,
    startDay: 24,
    endMonth: 1,
    endDay: 6,
  },
  // Easter 2025 (April 18-21)
  {
    name: 'Easter 2025',
    startMonth: 4,
    startDay: 18,
    endMonth: 4,
    endDay: 21,
    year: 2025,
  },
  // Easter 2026 (March 29 - April 5)
  {
    name: 'Easter 2026',
    startMonth: 3,
    startDay: 29,
    endMonth: 4,
    endDay: 5,
    year: 2026,
  },
];

/**
 * Check if a date is a weekend (Friday or Saturday)
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday or Saturday
}

/**
 * Check if a date falls within a high season period
 */
function isDateInPeriod(date: Date, period: HighSeasonPeriod): boolean {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-indexed to 1-indexed
  const day = date.getDate();

  // If period has a specific year, check it matches
  if (period.year && period.year !== year) {
    return false;
  }

  // Handle periods that cross year boundary (e.g., Christmas)
  if (period.startMonth > period.endMonth) {
    // Period crosses year boundary
    return (
      (month === period.startMonth && day >= period.startDay) ||
      (month > period.startMonth) ||
      (month < period.endMonth) ||
      (month === period.endMonth && day <= period.endDay)
    );
  }

  // Normal period within same year
  if (month < period.startMonth || month > period.endMonth) {
    return false;
  }

  if (month === period.startMonth && day < period.startDay) {
    return false;
  }

  if (month === period.endMonth && day > period.endDay) {
    return false;
  }

  return true;
}

/**
 * Check if a date is in high season
 */
export function isHighSeason(date: Date): boolean {
  return HIGH_SEASON_PERIODS.some(period => isDateInPeriod(date, period));
}

/**
 * Get the type of day (weekday, weekend, or high season)
 * Priority: highSeason > weekend > weekday
 */
export function getDayType(date: Date): DayType {
  if (isHighSeason(date)) {
    return 'highSeason';
  }
  if (isWeekend(date)) {
    return 'weekend';
  }
  return 'weekday';
}

/**
 * Calculate the number of nights by type between two dates
 * The night is counted based on the check-in date
 */
export function getNightsByType(checkIn: Date, checkOut: Date): NightsByType {
  const nights: NightsByType = {
    weekday: 0,
    weekend: 0,
    highSeason: 0,
  };

  // Iterate through each night
  const currentDate = new Date(checkIn);
  while (currentDate < checkOut) {
    const dayType = getDayType(currentDate);
    nights[dayType]++;
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return nights;
}

/**
 * Calculate total nights between two dates
 */
export function getTotalNights(checkIn: Date, checkOut: Date): number {
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
