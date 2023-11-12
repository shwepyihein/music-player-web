import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  if (time && !isNaN(time)) {
    const hours = Math.floor(time / 3600);
    const formatHours = hours < 10 ? `0${hours}` : `${hours}`;

    const minutes = Math.floor((time % 3600) / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formatHours}:${formatMinutes}:${formatSeconds}`;
  }
  return '00:00:00';
};
