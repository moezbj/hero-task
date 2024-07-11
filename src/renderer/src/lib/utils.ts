import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...inputs: ClassValue[]): any {
  return twMerge(clsx(inputs))
}
export { cn }
