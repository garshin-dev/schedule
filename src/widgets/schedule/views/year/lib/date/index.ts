import { getMonthDates } from '@/widgets/schedule/views/month/lib/date' // todo: fix path
import { MONTHS } from '@/shared/constants/date'
import { getWeekNumber } from '@/shared/lib/date'

interface WeekEntry {
  date: Date
  num: number
}

export function getYearDates(year: number) {
  return Array.from({ length: 12 }, (_, el) => el + 1).map((el) => {
    const name = MONTHS[el - 1]
    const days = getMonthDates(year, el, true)
    const weeks: WeekEntry[] = []
    const encounteredWeeks = new Map<number, number>()

    for (const day of days) {
      const weekNumber = getWeekNumber(day)

      encounteredWeeks.set(weekNumber, (encounteredWeeks.get(weekNumber) || 0) + 1)

      if (encounteredWeeks.get(weekNumber) === 7) {
        weeks.push({ date: day, num: weekNumber })
      }
    }

    return {
      name,
      days,
      weeks,
    }
  })
}
