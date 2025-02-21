export function getDaysInMonth(year: number, month: Date): number {
  return new Date(year, month.getMonth() + 1, 0).getDate()
}

export function getDatesInRange(limit?: number, date?: Date) {
  const firstDay = date || new Date()
  const day = firstDay.getDay()
  const count = limit || (day > 1 ? 7 - day + 1 : 7)
  const weekDates = []

  for (let i = 0; i < count; i++) {
    const day = new Date(firstDay)
    day.setDate(firstDay.getDate() + i)
    weekDates.push(day)
  }

  return weekDates
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

export function getFirstDayOfMonth(year: number, month: Date) {
  return new Date(year, month.getMonth(), 1)
}

export function getLastDayOfMonth(year: number, month: Date) {
  return new Date(year, month.getMonth() + 1, 0)
}
