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

    currentTimeUnit: {{ currentTimeUnit.name }}

    <div class="flex flex-col w-full" v-if="currentTimeUnit.value === TimeUnits.Year">
      YEAR
    </div>
    <div class="flex flex-col w-full" v-else-if="currentTimeUnit.value === TimeUnits.Month">
      <div class="grid grid-cols-7 w-full" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
        <div class="text-center border-b border-b-black/10 pb-2" v-for="dayOfWeek in WEEKS" :key="dayOfWeek">
          <div
            class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim text-black"
          >
            <span>
              {{ dayOfWeek }}
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-7 w-full border-l border-l-black/10" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
        <div
          v-for="date in CURRENT_DAYS" :key="date.toString()"
          class="border-r border-b border-b-black/10 border-r-black/10 flex flex-col gap-1"
          :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
        >
          <template v-if="isEvent(date)">
            <button
              v-for="event in MOCK_EVENTS.filter(item => item.date.getTime() === date.getTime()).slice(0, 3)"
              class="bg-white z-10 flex flex-col size-full rounded-md h-auto"
              @mouseover="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <span
                class="flex flex-col items-start text-left size-full text-black px-1 py-0.5 rounded-md anim border-2 border-transparent"
                :style="{
                  backgroundColor: hexToRgba(event.background, 0.3),
                  borderColor: isHovered ? event.background : ''
                }"
              >
                <span class="flex gap-1 w-full">
                  <span class="text-black/60">{{ event.timeStart }}</span>
                  <span class="truncate">{{ event.name }}</span>
                </span>
              </span>
            </button>

            <div class="mt-auto flex gap-1 py-1 px-2">
              <button
                class="underline"
                v-if="MOCK_EVENTS.filter(item => item.date.getTime() === date.getTime()).length > 3"
                @click="selectDay(date)"
              >
                Show more
              </button>
              <button @click="selectDay(date)" class="ml-auto">{{ date.getDate() }}</button>
            </div>
          </template>
          <button @click="selectDay(date)" class="text-right mt-auto py-1 px-2" v-else>{{ date.getDate() }}</button>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full" v-else>
      <div class="grid grid-cols-7 w-full pl-14" :style="{ gridTemplateColumns: `repeat(${CURRENT_DAYS.length}, minmax(0, 1fr))` }">
        <div class="text-center border-b border-b-black/10 pb-2" v-for="date in CURRENT_DAYS" :key="date.toString()">
          <button
            class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim hover:bg-black/10"
            :class="{
              [isCurrentDay(date) ? 'text-black' : 'text-black/30 hover:text-black/50']: true,
              'pointer-events-none': CURRENT_DAYS.length === 1
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
            <div class="grid grid-cols-7 w-full" :style="{ gridTemplateColumns: `repeat(${CURRENT_DAYS.length}, minmax(0, 1fr))` }">
              <div v-for="date in CURRENT_DAYS" :key="date.toString()" class="border-r border-r-black/10">
                <div
                  class="flex uppercase text-center border-b border-b-black/10 relative"
                  :style="{ height: DEFAULT_WEEK_CELL_HEIGHT + 'px' }"
                  v-for="hour in HOURS"
                  :key="hour"
                >
                  <button
                    v-if="isEvent(date, hour)"
                    class="bg-white z-10 flex flex-col absolute left-0 top-0 size-full rounded-xl"
                    :style="{
                      height: `calc(${getEventHeight(isEvent(date, hour))}px - 1px)`,
                      marginTop: `${getEventOffset(isEvent(date, hour).timeStart)}px`,
                      outlineColor: isEvent(date, hour).background
                    }"
                    @mouseover="isHovered = true"
                    @mouseleave="isHovered = false"
                  >
                    <span
                      class="flex flex-col items-start text-left size-full text-black px-3 py-2 rounded-xl anim border-2 border-transparent"
                      :style="{
                        backgroundColor: hexToRgba(isEvent(date, hour).background, 0.3),
                        borderColor: isHovered ? isEvent(date, hour).background : ''
                      }"
                    >
                      <span>{{ isEvent(date, hour).name }}</span>
                      <span class="text-black/60">
                        {{ isEvent(date, hour).timeStart }} - {{ isEvent(date, hour).timeEnd }}
                      </span>
                    </span>
                  </button>
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

const DEFAULT_WEEK_CELL_HEIGHT = 60
const DEFAULT_MONTH_CELL_HEIGHT = 140
const MAX_MONTH_EVENT_COUNT = 3
const CURRENT_YEAR: number = getCurrentYear()
const CURRENT_MONTH: Date = getCurrentMonthDate()
const CURRENT_DAYS = ref<Date[]>(getCurrentDates())
const HOURS: string[] = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const isHovered = ref<boolean>(false)

function hexToRgba(hex: string, opacity: number) {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const MONTHS: string[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

const WEEKS: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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
  ...(CURRENT_DAYS.value.length === 7 ? [] : [{
    name: `${CURRENT_DAYS.value.length} days`,
    value: TimeUnits.Days,
    selected: true
  }]),
  {
    name: 'Week',
    value: TimeUnits.Week,
    selected: CURRENT_DAYS.value.length === 7
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

const MOCK_EVENTS = [
  {
    id: 1,
    name: 'Weekly team meeting',
    date: new Date('2025.02.20'),
    timeStart: '03:00',
    timeEnd: '04:30',
    background: '#fa934b',
  },
  {
    id: 1,
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
    date: new Date('2025.02.11'),
    timeStart: '03:00',
    timeEnd: '04:30',
    background: '#fa934b',
  },
  {
    id: 5,
    name: 'Weekly team meeting',
    date: new Date('2025.02.11'),
    timeStart: '09:25',
    timeEnd: '12:10',
    background: '#3bbd00',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.11'),
    timeStart: '07:15',
    timeEnd: '11:30',
    background: '#d11c91',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    date: new Date('2025.02.11'),
    timeStart: '14:15',
    timeEnd: '17:30',
    background: '#d1ad1c',
  }
]

const currentTimeUnit = computed((): Item => items.value.find(item => item.selected) as Item)

function timeUnitHandler(item: Item) {
  switch (item.value) {
    case TimeUnits.Day:
      CURRENT_DAYS.value = getCurrentDates(1)
      break;
    case TimeUnits.Days:
      CURRENT_DAYS.value = getCurrentDates()
      break;
    case TimeUnits.Week:
      const today = new Date();
      const firstDayOfWeek = getFirstDayOfWeek(today)
      CURRENT_DAYS.value = getCurrentDates(7, firstDayOfWeek)
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

      CURRENT_DAYS.value = getCurrentDates(totalCount, firstDayOfWeekOfMonth)
      break;
  }
}

function isEvent(date: Date, hour?: string) { // todo: optimize
  const hourStart = hour?.split(':')?.[0]

  return MOCK_EVENTS.find(item => {
    const isYear = item.date.getFullYear() === date.getFullYear()
    const isMonth = item.date.getMonth() === date.getMonth()
    const isDay = item.date.getDate() === date.getDate()
    const isTime = hour ? item.timeStart.split(':')[0] === hourStart : true

    return isYear && isMonth && isDay && isTime
  })
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
  const [_, minutes] = timeStart.split(':')
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

  CURRENT_DAYS.value = getCurrentDates(1, date)
}
</script>
