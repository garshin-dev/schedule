import { getDayOfYear } from '@/widgets/schedule/views/days/lib/date'
import { getWeekNumber } from '@/shared/lib/date'

export async function showDay(date: Date, router: ReturnType<typeof useRouter>) {
  const year = date.getFullYear()
  const day = getDayOfYear(date)

  await router.push({
    name: 'schedule-day',
    params: {
      year: year,
      day: day,
    },
  })
}

export async function showWeek(date: Date, router: ReturnType<typeof useRouter>) {
  const year = date.getFullYear()
  const week = getWeekNumber(date)

  await router.push({
    name: 'schedule-week',
    params: {
      year: year,
      week: week,
    },
  })
}

export async function showMonth(date: Date, router: ReturnType<typeof useRouter>) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  await router.push({
    name: 'schedule-month',
    params: {
      year: year,
      month: month,
    },
  })
}
