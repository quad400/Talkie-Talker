import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTime(date: Date) {
  if (date === null) {
    return "-";
  }
  const now = new Date();
  // @ts-ignore
  const s = Math.abs(now - new Date(date)) / 1000;
  // Seconds
  if (s < 60) {
    return "now";
  }
  // Minutes
  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m ago`;
  }
  // Hours
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / (60 * 60));
    return `${h}h ago`;
  }
  // Days
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / (60 * 60 * 24));
    return `${d}d ago`;
  }
  // Weeks
  if (s < 60 * 60 * 24 * 7 * 4) {
    const w = Math.floor(s / (60 * 60 * 24 * 7));
    return `${w}w ago`;
  }
  // Months
  if (s < 60 * 60 * 24 * 7 * 4 * 12) {
    const months = Math.floor(s / (60 * 60 * 24 * 7 * 4 ));
    return `${months}mnt ago`;
  }
  // Years
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}y ago`;
}
