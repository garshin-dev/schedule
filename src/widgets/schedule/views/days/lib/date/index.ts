import { WEEK_DAYS } from '@/shared/constants/date'

export function getDayByDate(date: Date) {
  return date.getDate()
}

export function getDayOfWeekByDate(date: Date) {
  const day = date.getDay()

  return WEEK_DAYS[day === 0 ? 6 : day - 1]
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function isCurrentDay(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return today.getTime() === date.getTime()
}
