<template>
  <div class="px-3 py-4 flex flex-col items-start">
    <div class="flex mt-4">
      <Select
        placeholder="Choose"
        v-model="items"
        @select="timeUnitHandler"
      />
    </div>

    <div class="flex gap-2 mt-4 mb-4">
      <Button>Some primary</Button>
      <Button variant="secondary">Some secondary</Button>
      <Button variant="outline">Some outline</Button>
    </div>

    <YearView v-if="currentTimeUnit.value === TimeUnits.Year" />
    <MonthView v-if="currentTimeUnit.value === TimeUnits.Month" :events="MOCK_EVENTS" @select-day="selectDay" :selected-days="selectedDays" />
    <div class="flex flex-col w-full" v-else>
      <div class="grid grid-cols-7 w-full pl-14" :style="{ gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))` }">
        <div class="text-center border-b border-b-black/10 pb-2" v-for="date in selectedDays" :key="date.toString()">
          <button
            class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim hover:bg-black/10"
            :class="{
              [isCurrentDay(date) ? 'text-black' : 'text-black/30 hover:text-black/50']: true,
              'pointer-events-none': selectedDays.length === 1
            }"
            @click="selectDay(date)"
          >
            <span class="text-4xl font-bold">
              {{ getDayByDate(date) }}
            </span>
              <span>
              {{ getDayOfWeekByDate(date) }}
            </span>
          </button>
        </div>
      </div>
      <div class="flex w-full">
        <div class="flex flex-col items-start border-r border-r-black/10 min-w-14">
          <span
            v-for="hour in HOURS"
            :key="hour"
            class="text-black/80 flex items-start justify-center"
            :style="{ height: DEFAULT_WEEK_CELL_HEIGHT + 'px' }"
          >
            <span class="-mt-3.5">
              {{ hour }}
            </span>
          </span>
        </div>
        <div class="w-full h-full">
          <div class="grid grid-cols-7 w-full" :style="{ gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))` }">
            <div v-for="date in selectedDays" :key="date.toString()" class="border-r border-r-black/10">
              <div
                class="flex uppercase text-center border-b border-b-black/10 relative"
                :style="{ height: DEFAULT_WEEK_CELL_HEIGHT + 'px' }"
                v-for="hour in HOURS"
                :key="hour"
              >
                <template v-if="isEvent(date, hour)?.length">
                  <button
                    v-for="event in isEvent(date, hour)"
                    :key="event.id"
                    class="bg-white z-10 flex flex-col absolute left-0 top-0 size-full rounded-xl hover:z-20"
                    :style="{
                      height: `calc(${getEventHeight(event)}px - 1px)`,
                      marginTop: `${getEventOffset(event.timeStart)}px`,
                      marginLeft: `${isOverlapping(event)}px`,
                      width: `calc(100% - ${isOverlapping(event)}px)`,
                      outlineColor: event.background
                    }"
                    @mouseover="isHovered = true"
                    @mouseleave="isHovered = false"
                  >
                    <span
                      class="flex flex-col items-start text-left size-full text-black px-3 py-2 rounded-xl anim border-2 border-transparent"
                      :style="{
                        backgroundColor: hexToRgba(event.background, 0.3),
                        borderColor: isHovered ? event.background : ''
                      }"
                    >
                      <span>{{ event.name }}</span>
                      <span class="text-black/60">
                        {{ event.timeStart }} - {{ event.timeEnd }}
                      </span>
                    </span>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Item} from "@/shared/ui/Select/select.type.ts";
import {YearView} from "@/widgets/schedule/views/year";
import {MonthView} from "@/widgets/schedule/views/month";
import type { Event } from '@/entities/schedule/event'
import {WEEKS} from "@/shared/constants/date";
import {hexToRgba} from "@/shared/lib/color";

const OVERLAPPING_OFFSET = 25
const DEFAULT_WEEK_CELL_HEIGHT = 60
const CURRENT_YEAR: number = getCurrentYear()
const CURRENT_MONTH: Date = getCurrentMonthDate()
const selectedDays = ref<Date[]>(getCurrentDates())

const HOURS: string[] = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const isHovered = ref<boolean>(false)

enum TimeUnits {
  Day = 'day',
  Days = 'days',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

const items = ref<Item[]>([
  {
    name: 'Day',
    value: TimeUnits.Day,
    selected: false
  },
  ...(selectedDays.value.length === 7 ? [] : [{
    name: `${selectedDays.value.length} days`,
    value: TimeUnits.Days,
    selected: true
  }]),
  {
    name: 'Week',
    value: TimeUnits.Week,
    selected: selectedDays.value.length === 7
  },
  {
    name: 'Month',
    value: TimeUnits.Month,
    selected: false
  },
  {
    name: 'Year',
    value: TimeUnits.Year,
    selected: false
  },
])

const MOCK_EVENTS: Event[] = [
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
    timeStart: '07:15',
    timeEnd: '011:30',
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
    timeStart: '18:15',
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

const currentTimeUnit = computed((): Item => items.value.find(item => item.selected) as Item)

function timeUnitHandler(item: Item) {
  switch (item.value) {
    case TimeUnits.Day:
      selectedDays.value = getCurrentDates(1)
      break;
    case TimeUnits.Days:
      selectedDays.value = getCurrentDates()
      break;
    case TimeUnits.Week:
      const today = new Date();
      const firstDayOfWeek = getFirstDayOfWeek(today)
      selectedDays.value = getCurrentDates(7, firstDayOfWeek)
      break;
    case TimeUnits.Month:
      const firstDayOfMonth = getFirstDayOfMonth(CURRENT_YEAR, CURRENT_MONTH)
      const lastDayOfMonth = getLastDayOfMonth(CURRENT_YEAR, CURRENT_MONTH)
      const firstDayOfWeekOfMonth = getFirstDayOfWeek(firstDayOfMonth)

      const daysInMonth = getDaysInMonth(CURRENT_YEAR, CURRENT_MONTH)

      const firstDayOfMonthNum = firstDayOfMonth.getDay()
      const lastDayOfMonthNum = lastDayOfMonth.getDay()

      const daysBefore = firstDayOfMonthNum === 0 ? 6 : firstDayOfMonthNum - 1;
      const daysAfter = lastDayOfMonthNum === 0 ? 0 : 7 - lastDayOfMonthNum;

      const totalCount = daysInMonth + daysBefore + daysAfter

      selectedDays.value = getCurrentDates(totalCount, firstDayOfWeekOfMonth)
      break;
  }
}

function isEvent(date: Date, hour?: string): Event[]|undefined { // todo: optimize
  const hourStart = hour?.split(':')?.[0]

  return MOCK_EVENTS.filter(item => {
    const isYear = item.date.getFullYear() === date.getFullYear()
    const isMonth = item.date.getMonth() === date.getMonth()
    const isDay = item.date.getDate() === date.getDate()
    const isTime = hour ? item.timeStart.split(':')[0] === hourStart : true

    return isYear && isMonth && isDay && isTime
  })
}

// const eventMap = computed<Record<number, Record<string, Event[]>>>(() => {
//   return MOCK_EVENTS.reduce<Record<number, Record<string, Event[]>>>((acc, event: Event) => {
//     const timestamp = event.date.getTime();
//     const timeStart = event.timeStart.split(':')[0]
//
//     if (!acc[timestamp]) acc[timestamp] = {};
//     if (!acc[timestamp][timeStart]) acc[timestamp][timeStart] = [];
//     acc[timestamp][timeStart].push(event);
//
//     return acc;
//   }, {} as Record<number, Record<string, Event[]>>);
// });

function isOverlapping(event: Event) {
  const count = MOCK_EVENTS.filter(item => {
    const isYear = item.date.getFullYear() === event.date.getFullYear()
    const isMonth = item.date.getMonth() === event.date.getMonth()
    const isDay = item.date.getDate() === event.date.getDate()

    const condition = event.timeStart >= item.timeStart && item.timeEnd > event.timeStart && event.id !== item.id

    return isYear && isMonth && isDay && condition
  })?.length

  return count ? count * OVERLAPPING_OFFSET : 0
}

function getEventHeight({timeStart, timeEnd}: {timeStart: string, timeEnd: string}) {
  const [timeStartHours, timeStartMinutes] = timeStart.split(':')
  const [timeEndHours, timeEndMinutes] = timeEnd.split(':')

  const hours = parseInt(timeEndHours) - parseInt(timeStartHours)
  const minutes = parseInt(timeEndMinutes) - parseInt(timeStartMinutes)

  const total = hours + minutes / 60

  return total * DEFAULT_WEEK_CELL_HEIGHT
}

function getEventOffset(timeStart: string) {
  const [, minutes] = timeStart.split(':')
  const value = parseInt(minutes) / 60

  return value * DEFAULT_WEEK_CELL_HEIGHT
}

function getDaysInMonth(year: number, month: Date): number {
  return new Date(year, month.getMonth() + 1, 0).getDate();
}

function getCurrentDates(limit?: number, date?: Date) {
  const firstDay = date || new Date();
  const day = firstDay.getDay()
  const count = limit || (day > 1 ? 7 - day + 1 : 7)
  const weekDates = [];

  for (let i = 0; i < count; i++) {
    const day = new Date(firstDay);
    day.setDate(firstDay.getDate() + i);
    weekDates.push(day);
  }

  return weekDates;
}

function getDayByDate(date: Date) {
  return date.getDate()
}

function getDayOfWeekByDate(date: Date) {
  const day = date.getDay()

  return WEEKS[day === 0 ? 6 : day - 1]
}

function getCurrentMonthDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function getCurrentYear() {
  return new Date().getFullYear()
}

function isCurrentDay(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function getFirstDayOfWeek(date: Date) {
  const dateCopy = new Date(date)
  const dayOfWeek = dateCopy.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  return new Date(dateCopy.setDate(dateCopy.getDate() + diff));
}

function getFirstDayOfMonth(year: number, month: Date) {
  return new Date(year, month.getMonth(), 1);
}

function getLastDayOfMonth(year: number, month: Date) {
  return new Date(year, month.getMonth() + 1, 0)
}

function selectDay(date: Date) {
  items.value.forEach(item => {
    item.selected = item.value === TimeUnits.Day
  })

  selectedDays.value = getCurrentDates(1, date)
}
</script>
