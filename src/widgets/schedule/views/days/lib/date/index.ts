import { WEEK_DAYS } from '@/shared/constants/date'

export function getDayByDate(date: Date) {
  return date.getDate()
}

export function getDayOfWeekByDate(date: Date) {
  const day = date.getDay()

  return WEEK_DAYS[day === 0 ? 6 : day - 1]
}

export function isCurrentDay(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return today.getTime() === date.getTime()
}
