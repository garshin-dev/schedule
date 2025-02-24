import { useRouter, useRoute } from 'vue-router'
import { ViewUnits, type Option, type Params } from './view-switch.types'
import { getWeekNumber } from '@/shared/lib/date'

const currentDate = new Date()

const CURRENT_YEAR: number = currentDate.getFullYear()
const CURRENT_MONTH: number = currentDate.getMonth()
const CURRENT_WEEK: number = getWeekNumber(currentDate)
const CURRENT_START_DAY: number = 1
const CURRENT_END_DAY: number = 4

const viewOptions = ref<Option[]>([
  {
    name: 'Day',
    value: ViewUnits.Day,
    selected: false,
  },
  {
    name: '4 days',
    value: ViewUnits.Days,
    selected: false,
  },
  {
    name: 'Week',
    value: ViewUnits.Week,
    selected: false,
  },
  {
    name: 'Month',
    value: ViewUnits.Month,
    selected: false,
  },
  {
    name: 'Year',
    value: ViewUnits.Year,
    selected: false,
  },
])

export const useViewSwitch = () => {
  const router = useRouter()
  const route = useRoute()
  const params = route.params

  const selectedView = computed<Option>(() => {
    return viewOptions.value.find((option) => option.selected)!
  })

  const viewHandler = (option: Option) => {
    switch (option.value) {
      case ViewUnits.Day:
        router.push({
          name: 'schedule',
          params: {
            year: CURRENT_YEAR,
            month: CURRENT_MONTH,
            week: CURRENT_WEEK,
            startDay: CURRENT_START_DAY,
          },
        })
        break
      case ViewUnits.Days:
        router.push({
          name: 'schedule',
          params: {
            year: CURRENT_YEAR,
            month: CURRENT_MONTH,
            week: CURRENT_WEEK,
            startDay: CURRENT_START_DAY,
            endDay: CURRENT_END_DAY,
          },
        })
        break
      case ViewUnits.Week:
        router.push({
          name: 'schedule',
          params: { year: CURRENT_YEAR, month: CURRENT_MONTH, week: CURRENT_WEEK },
        })
        break
      case ViewUnits.Month:
        router.push({ name: 'schedule', params: { year: CURRENT_YEAR, month: CURRENT_MONTH } })
        break
      case ViewUnits.Year:
        router.push({ name: 'schedule', params: { year: CURRENT_YEAR } })
        break
    }
  }

  const defineView = (params: Params) => {
    const { year, month, week, startDay, endDay } = params

    if (endDay) {
      selectView(ViewUnits.Days)
    } else if (startDay) {
      selectView(ViewUnits.Day)
    } else if (week) {
      selectView(ViewUnits.Week)
    } else if (month) {
      selectView(ViewUnits.Month)
    } else if (year) {
      selectView(ViewUnits.Year)
    } else {
      router.push({ name: 'schedule', params: { year: CURRENT_YEAR } })
    }
  }

  const selectView = (unit: ViewUnits) => {
    viewOptions.value.forEach((option) => {
      option.selected = option.value === unit
    })
  }

  console.log('defefefe')

  defineView(params)

  return {
    viewOptions,
    viewHandler,
    selectedView,
  }
}
