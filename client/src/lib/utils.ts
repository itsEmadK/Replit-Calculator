import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to a display-friendly string, avoiding
 * floating point precision issues.
 */
export function formatNumberForDisplay(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // Convert to string with up to 10 decimal places
  const strNum = num.toFixed(10);
  // Remove trailing zeros
  return parseFloat(strNum).toString();
}
