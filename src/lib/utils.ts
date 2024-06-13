import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date_ms: number): string {
  const date = new Date(date_ms)
  const now = new Date()

  // Comprobar si la fecha es hoy
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  // Comprobar si la fecha es ayer
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  // Comprobar si la fecha es en la misma semana (asumiendo semana comienza en domingo)
  const dayDifference = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  if (dayDifference < 7 && now.getDay() >= date.getDay()) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  // Devolver la fecha en formato MM/DD/YYYY
  return date.toLocaleDateString('en-US')
}
