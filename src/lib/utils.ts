import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  "focus:ring-2",
  "focus:ring-indigo-200",
  "focus:border-indigo-500",
]

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-indigo-500",
]

export const hasErrorInput = [
  "ring-2",
  "border-red-500",
  "ring-red-200",
]

export const usNumberformatter = (number: number, decimals = 0) =>
  Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
    .format(Number(number))
    .toString()

export const percentageFormatter = (number: number, decimals = 1) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
  const symbol = number > 0 && number !== Infinity ? "+" : ""

  return `${symbol}${formattedNumber}`
}
