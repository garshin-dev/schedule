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
    const encounteredWeeks = new Set<number>()

    for (const day of days) {
      const weekNum = getWeekNumber(day)

      if (!encounteredWeeks.has(weekNum)) {
        encounteredWeeks.add(weekNum)
        weeks.push({ date: day, num: weekNum })
      }
    }

    return {
      name,
      days,
      weeks,
    }
  })
}
