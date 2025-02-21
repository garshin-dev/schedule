<template>
  <div class="px-3 py-4 flex flex-col items-start">
    <div class="flex gap-8 items-center mb-4">
      <Select placeholder="Choose" v-model="timeUnitOptions" @select="timeUnitHandler" />

      <div class="flex gap-4">
        <div class="flex gap-2">
          <span>Year:</span>
          <span>{{ CURRENT_YEAR }}</span>
        </div>

        <div class="flex gap-2" v-if="currentTimeUnit.value !== TimeUnits.Year">
          <span>Month:</span>
          <span class="uppercase">{{ MONTHS[CURRENT_MONTH.getMonth()] }}</span>
        </div>
      </div>
    </div>

    <YearView v-if="currentTimeUnit.value === TimeUnits.Year" />
    <MonthView
      v-else-if="currentTimeUnit.value === TimeUnits.Month"
      :events="MOCK_EVENTS"
      @select-day="selectDay"
      :selected-days="selectedDays"
    />
    <DaysView v-else :events="MOCK_EVENTS" @select-day="selectDay" :selected-days="selectedDays" />
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/shared/ui/Select/select.type.ts'
import { YearView } from '@/widgets/schedule/views/year'
import { MonthView } from '@/widgets/schedule/views/month'
import type { IEvent } from '@/entities/schedule/event'
import { DaysView } from '@/widgets/schedule/views/days'
import {
  getCurrentMonthDate,
  getCurrentYear,
  getDatesInRange,
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getDaysInMonth,
} from '../lib/date'
import { MONTHS } from '@/shared/constants/date'

const CURRENT_YEAR: number = getCurrentYear()
const CURRENT_MONTH: Date = getCurrentMonthDate()
const selectedDays = ref<Date[]>(getDates())

enum TimeUnits {
  Day = 'day',
  Days = 'days',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

const timeUnitOptions = ref<Item[]>([
  {
    name: 'Day',
    value: TimeUnits.Day,
    selected: false,
  },
  ...(selectedDays.value.length === 7
    ? []
    : [
        {
          name: `${selectedDays.value.length} days`,
          value: TimeUnits.Days,
          selected: true,
        },
      ]),
  {
    name: 'Week',
    value: TimeUnits.Week,
    selected: selectedDays.value.length === 7,
  },
  {
    name: 'Month',
    value: TimeUnits.Month,
    selected: false,
  },
  {
    name: 'Year',
    value: TimeUnits.Year,
    selected: false,
  },
])

const MOCK_EVENTS: IEvent[] = [
  {
    id: 1,
    name: 'Weekly team meeting',
    date: new Date('2025.02.20'),
    timeStart: '03:00',
    timeEnd: '04:30',
    background: '#fa934b',
  },
  {
    id: 111,
    name: 'Weekly team me!!!!!',
    date: new Date('2025.02.20'),
    timeStart: '03:30',
    timeEnd: '05:25',
    background: '#fac34b',
  },
  {
    id: 2,
    name: 'Weekly team meeting',
    date: new Date('2025.02.20'),
    timeStart: '09:25',
    timeEnd: '12:10',
    background: '#3bbd00',
  },
  {
    id: 3,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.21'),
    timeStart: '08:15',
    timeEnd: '14:25',
    background: '#d11c91',
  },
  {
    id: 4,
    name: 'Weekly team meeting',
    date: new Date('2025.02.22'),
    timeStart: '03:00',
    timeEnd: '04:30',
    background: '#fa934b',
  },
  {
    id: 5,
    name: 'Weekly team meeting',
    date: new Date('2025.02.22'),
    timeStart: '09:25',
    timeEnd: '12:10',
    background: '#3bbd00',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.22'),
    timeStart: '07:15',
    timeEnd: '11:30',
    background: '#d11c91',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.22'),
    timeStart: '14:15',
    timeEnd: '17:30',
    background: '#d1ad1c',
  },
  {
    id: 7,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.22'),
    timeStart: '12:15',
    timeEnd: '19:45',
    background: '#d1521c',
  },
  {
    id: 8,
    name: 'Weekly team meeting 23',
    date: new Date('2025.02.22'),
    timeStart: '18:10',
    timeEnd: '19:25',
    background: '#1cd1a1',
  },
  {
    id: 9,
    name: 'Weekly team meeting 7',
    date: new Date('2025.02.22'),
    timeStart: '16:00',
    timeEnd: '17:00',
    background: '#ff4949',
  },
  {
    id: 10,
    name: 'Weekly team meeting',
    date: new Date('2025.02.22'),
    timeStart: '17:15',
    timeEnd: '18:10',
    background: '#3bbd30',
  },
]

const currentTimeUnit = computed(
  (): Item => timeUnitOptions.value.find((item) => item.selected) as Item,
)

function selectDay(date: Date) {
  timeUnitOptions.value.forEach((item) => {
    item.selected = item.value === TimeUnits.Day
  })

  selectedDays.value = getDatesInRange(1, date)
}

function getWeekDates() {
  const today = new Date()
  const firstDayOfWeek = getFirstDayOfWeek(today)
  return getDatesInRange(7, firstDayOfWeek)
}

function getMonthDates() {
  const firstDayOfMonth = getFirstDayOfMonth(CURRENT_YEAR, CURRENT_MONTH)
  const lastDayOfMonth = getLastDayOfMonth(CURRENT_YEAR, CURRENT_MONTH)
  const firstDayOfWeekOfMonth = getFirstDayOfWeek(firstDayOfMonth)

  const daysInMonth = getDaysInMonth(CURRENT_YEAR, CURRENT_MONTH)

  const firstDayOfMonthNum = firstDayOfMonth.getDay()
  const lastDayOfMonthNum = lastDayOfMonth.getDay()

  const daysBefore = firstDayOfMonthNum === 0 ? 6 : firstDayOfMonthNum - 1
  const daysAfter = lastDayOfMonthNum === 0 ? 0 : 7 - lastDayOfMonthNum

  const totalCount = daysInMonth + daysBefore + daysAfter

  return getDatesInRange(totalCount, firstDayOfWeekOfMonth)
}

function getDate() {
  return getDatesInRange(1)
}

function getDates() {
  return getDatesInRange()
}

function timeUnitHandler(item: Item) {
  switch (item.value) {
    case TimeUnits.Day:
      selectedDays.value = getDate()
      break
    case TimeUnits.Days:
      selectedDays.value = getDates()
      break
    case TimeUnits.Week:
      selectedDays.value = getWeekDates()
      break
    case TimeUnits.Month:
      selectedDays.value = getMonthDates()
      break
  }
}
</script>
