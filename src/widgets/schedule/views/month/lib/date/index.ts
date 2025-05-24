import { getDatesInRange } from '@/shared/lib/date'

export function getMonthDates(year: number, month: number, sixWeek?: boolean) {
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const lastDayOfMonth = getLastDayOfMonth(year, month)
  const firstDayOfWeekOfMonth = getFirstDayOfWeek(firstDayOfMonth)

  const daysInMonth = getDaysInMonth(year, month)

  const firstDayOfMonthNum = firstDayOfMonth.getDay()
  const lastDayOfMonthNum = lastDayOfMonth.getDay()

  const daysBefore = firstDayOfMonthNum === 0 ? 6 : firstDayOfMonthNum - 1
  const daysAfter = lastDayOfMonthNum === 0 ? 0 : 7 - lastDayOfMonthNum

  let totalCount = daysInMonth + daysBefore + daysAfter

  if (totalCount === 35 && sixWeek) totalCount += 7

  return getDatesInRange(totalCount, firstDayOfWeekOfMonth)
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function getCurrentMonthDate() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export function getCurrentYear() {
  return new Date().getFullYear()
}

export function getFirstDayOfWeek(date: Date) {
  const dateCopy = new Date(date)
  const dayOfWeek = dateCopy.getDay()
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  return new Date(dateCopy.setDate(dateCopy.getDate() + diff))
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month - 1, 1)
}

export function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0)
}

export function isThisMonth(date: Date, month: number): boolean {
  return date.getMonth() + 1 === month
}
