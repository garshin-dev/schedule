<template>
  <div class="px-3 py-4 flex flex-col items-start">
    <div class="flex gap-8 items-center mb-4">
      <Select v-model="timeUnitOptions" placeholder="Choose" @select="timeUnitHandler" />

      <div class="flex gap-4">
        <div class="flex gap-2">
          <span>Year:</span>
          <span>{{ CURRENT_YEAR }}</span>
        </div>

        <div v-if="currentTimeUnit.value !== TimeUnits.Year" class="flex gap-2">
          <span>Month:</span>
          <span class="uppercase">{{ MONTHS[CURRENT_MONTH.getMonth()] }}</span>
        </div>
      </div>
    </div>

    <YearView v-if="currentTimeUnit.value === TimeUnits.Year" />
    <MonthView
      v-else-if="currentTimeUnit.value === TimeUnits.Month"
      :events="MOCK_EVENTS"
      :selected-days="selectedDays"
      @select-day="selectDay"
    />
    <DaysView v-else :events="MOCK_EVENTS" :selected-days="selectedDays" @select-day="selectDay" />
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
    startDate: new Date('2025.02.20'),
    endDate: new Date('2025.02.20'),
    startTime: '03:00',
    endTime: '04:30',
    background: '#fa934b',
  },
  {
    id: 111,
    name: 'Weekly team me!!!!!',
    startDate: new Date('2025.02.20'),
    endDate: new Date('2025.02.20'),
    startTime: '03:30',
    endTime: '05:25',
    background: '#fac34b',
  },
  {
    id: 2,
    name: 'Weekly team meeting',
    startDate: new Date('2025.02.20'),
    endDate: new Date('2025.02.20'),
    startTime: '09:25',
    endTime: '12:10',
    background: '#3bbd00',
  },
  {
    id: 3,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.02.21'),
    endDate: new Date('2025.02.21'),
    startTime: '08:15',
    endTime: '14:25',
    background: '#d11c91',
  },
  {
    id: 4,
    name: 'Weekly team meeting',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '03:00',
    endTime: '04:30',
    background: '#fa934b',
  },
  {
    id: 5,
    name: 'Weekly team meeting',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '09:25',
    endTime: '12:10',
    background: '#3bbd00',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '07:15',
    endTime: '11:30',
    background: '#d11c91',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '14:15',
    endTime: '17:30',
    background: '#d1ad1c',
  },
  {
    id: 7,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '12:15',
    endTime: '19:45',
    background: '#d1521c',
  },
  {
    id: 8,
    name: 'Weekly team meeting 23',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '18:10',
    endTime: '19:25',
    background: '#1cd1a1',
  },
  {
    id: 9,
    name: 'Weekly team meeting 7',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '16:00',
    endTime: '17:00',
    background: '#ff4949',
  },
  {
    id: 10,
    name: 'Weekly team meeting',
    startDate: new Date('2025.02.22'),
    endDate: new Date('2025.02.22'),
    startTime: '17:15',
    endTime: '18:10',
    background: '#3bbd30',
  },
  {
    id: 10,
    name: 'Weekly team meeting',
    startDate: new Date('2025.02.21'),
    endDate: new Date('2025.02.23'),
    startTime: '22:15',
    endTime: '03:40',
    background: '#0ce1c8',
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
