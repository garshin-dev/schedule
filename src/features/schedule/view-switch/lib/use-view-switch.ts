import { useRouter, useRoute } from 'vue-router'
import { getWeekNumber } from '@/shared/lib/date'
import { ViewUnits } from '../model/view-switch.types.ts'
import type { Option, Params } from '../model/view-switch.types.ts'

const currentDate = new Date()

const CURRENT_YEAR: number = currentDate.getFullYear()
const CURRENT_MONTH: number = currentDate.getMonth() + 1
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

  const selectedView = computed<Option>(() => {
    return viewOptions.value.find((option) => option.selected)!
  })

  const viewHandler = async (option: Option) => {
    switch (option.value) {
      case ViewUnits.Day:
        await router.push({
          name: 'schedule-days',
          params: {
            year: CURRENT_YEAR,
            week: CURRENT_WEEK,
            startDay: CURRENT_START_DAY,
          },
        })
        break
      case ViewUnits.Days:
        await router.push({
          name: 'schedule-days',
          params: {
            year: CURRENT_YEAR,
            week: CURRENT_WEEK,
            startDay: CURRENT_START_DAY,
            endDay: CURRENT_END_DAY,
          },
        })
        break
      case ViewUnits.Week:
        await router.push({
          name: 'schedule-week',
          params: { year: CURRENT_YEAR, week: CURRENT_WEEK },
        })
        break
      case ViewUnits.Month:
        await router.push({
          name: 'schedule-month',
          params: { year: CURRENT_YEAR, month: CURRENT_MONTH },
        })
        break
      case ViewUnits.Year:
        await router.push({
          name: 'schedule-year',
          params: { year: CURRENT_YEAR },
        })
        break
    }

    selectView(option.value)
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

  watch(
    () => route.params,
    (params: Params) => defineView(params),
    { immediate: true },
  )

  return {
    viewOptions,
    viewHandler,
    selectedView,
  }
}
