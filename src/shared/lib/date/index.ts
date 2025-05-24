export function getDatesInRange(limit?: number, date?: Date) {
  const firstDay = date || new Date()
  firstDay.setHours(0, 0, 0, 0)

  const day = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const count = limit || (day > 1 ? 7 - day : 7)
  const weekDates = []

  for (let i = 0; i < count; i++) {
    const day = new Date(firstDay)
    day.setDate(firstDay.getDate() + i)
    weekDates.push(day)
  }

  return weekDates
}

export function getWeekNumber(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function getDateByWeek(year: number, week: number) {
  const date = new Date(year, 0, 4)
  const firstWeekStart = new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1))
  firstWeekStart.setDate(firstWeekStart.getDate() + (week - 1) * 7)

  return firstWeekStart
}

export function getDatesBetween(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d))
  }

  return dates
}
