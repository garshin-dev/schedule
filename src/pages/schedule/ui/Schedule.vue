<template>
  <div class="px-3 py-4 flex flex-col items-start">
    <div class="flex mt-4">
      <Select
        placeholder="Choose"
        v-model="items"
        @select="timeUnitHandler"
      />
    </div>

    <div class="flex flex-col gap-2 mt-4 mb-4">
      <Button>Some primary</Button>
      <Button variant="secondary">Some secondary</Button>
      <Button variant="outline">Some outline</Button>
    </div>

    currentTimeUnit: {{ currentTimeUnit.name }}

    <div class="grid grid-cols-7 w-full pl-14" :style="{ gridTemplateColumns: `repeat(${CURRENT_DAYS.length}, minmax(0, 1fr))` }">
      <div class="text-center border-b border-b-black/10 pb-2" v-for="date in CURRENT_DAYS" :key="date.toString()">
        <button
          class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md"
          :class="[isCurrentDay(date) ? 'text-black pointer-events-none' : 'text-black/30 hover:text-black/50 anim hover:bg-black/10']"
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
          :style="{ minHeight: DEFAULT_CELL_HEIGHT + 'px' }"
        >
          <span class="-mt-3.5">
            {{ hour }}
          </span>
        </span>
      </div>
      <div class="w-full h-full">
        <div class="grid grid-cols-7 w-full" :style="{ gridTemplateColumns: `repeat(${CURRENT_DAYS.length}, minmax(0, 1fr))` }">
          <div v-for="(date, index) in CURRENT_DAYS" :key="date.toString()" class="border-r border-r-black/10">
            <div
              class="flex uppercase text-center border-b border-b-black/10 relative p-2"
              :style="{ minHeight: DEFAULT_CELL_HEIGHT + 'px' }"
              v-for="(hour, index2) in HOURS"
              :key="hour"
            >
              <button
                v-if="index === 2 && index2 === 2"
                class="bg-white z-10 flex flex-col absolute left-0 top-0 size-full group p-2"
                :style="{ height: `calc(180px - 1px)` }"
              >
                <span class="flex flex-col items-start text-left bg-[#fa934b]/30 size-full text-black px-3 py-2 rounded-xl anim group-hover:border-[#fa934b] border-2 border-transparent">
                  <span>Weekly team meeting</span>
                  <span class="text-black/60">14:30 - 15:20</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {axios} from "@/shared/config/axios"
import type {Item} from "@/shared/ui/Select/select.type.ts";

const DEFAULT_CELL_HEIGHT = 60
const CURRENT_YEAR: number = getCurrentYear()
const CURRENT_MONTH: Date = getCurrentMonthDate()
const CURRENT_DAYS = ref<Date[]>(getCurrentDates())
const HOURS: string[] = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const CURRENT_DAYS_IN_MONTH: number = getDaysInMonth(CURRENT_YEAR, CURRENT_MONTH)
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

const currentTimeUnit = computed((): Item => items.value.find(item => item.selected) as Item)

function timeUnitHandler(item: Item) {
  console.log('timeUnitHandler item', item)

  switch (item.value) {
    case TimeUnits.Day:
      CURRENT_DAYS.value = getCurrentDates(1)
      console.log('!!!', CURRENT_DAYS.value)
      break;
    case TimeUnits.Days:
      CURRENT_DAYS.value = getCurrentDates()
      break;
    case TimeUnits.Week:
      CURRENT_DAYS.value = getCurrentDates(7)
      break;
  }
}

function getDaysInMonth(year: number, month: Date): number {
  return new Date(year, month.getMonth() + 1, 0).getDate();
}

function getCurrentDates(limit?: number, startDate?: Date) {
  const firstDayOfWeek = startDate || new Date();
  const day = firstDayOfWeek.getDay()
  const count = limit || (day > 1 ? 7 - day + 1 : 7)
  const weekDates = [];

  console.log('getCurrentDates count', count)
  console.log('getCurrentDates limit', limit)

  for (let i = 0; i < count; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(day);
  }

  return weekDates;
}

function getDayByDate(date: Date) {
  return date.getDate()
}

function getDayOfWeekByDate(date: Date) {
  const WEEKS: string[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return WEEKS[date.getDay()]
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
</script>
