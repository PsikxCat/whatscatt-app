import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MessageType } from '@/types'

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

export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)
  return date1.toDateString() === date2.toDateString()
}

export const getRelativeDateTime = (message: MessageType, previousMessage?: MessageType): string | undefined => {
  const messageDate = new Date(message._creationTime)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)

  if (!previousMessage || !isSameDay(previousMessage._creationTime, message._creationTime)) {
    if (isSameDay(messageDate.getTime(), now.getTime())) {
      return 'Hoy'
    } else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
      return 'Ayer'
    } else if (messageDate >= weekAgo) {
      return messageDate.toLocaleDateString(undefined, { weekday: 'long' })
    } else {
      return messageDate.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
  }
  return undefined
}
