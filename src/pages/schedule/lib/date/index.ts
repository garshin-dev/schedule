import { getWeekNumber } from '@/shared/lib/date'

export const showDay = async (date: Date, router: ReturnType<typeof useRouter>) => {
  const year = date.getFullYear()
  const week = getWeekNumber(date)
  const day = date.getDay() === 0 ? 7 : date.getDay()

  await router.push({
    name: 'schedule-days',
    params: {
      year: year,
      week: week,
      startDay: day,
    },
  })
}

export const showWeek = async (date: Date, router: ReturnType<typeof useRouter>) => {
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

export const showMonth = async (date: Date, router: ReturnType<typeof useRouter>) => {
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
