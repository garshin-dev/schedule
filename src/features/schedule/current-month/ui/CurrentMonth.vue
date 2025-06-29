<template>
  <button
    v-if="month"
    class="hover:bg-blue/20 text-blue anim rounded-md px-2 py-1 text-[24px] font-bold uppercase"
    @click="showMonth"
  >
    {{ MONTHS[month] }}
  </button>
</template>

<script setup lang="ts">
import type { RouteParams } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { MONTHS } from '@/shared/constants/date'
import { getDateByDay, getDateByWeek } from '@/shared/lib/date'

const route = useRoute()
const router = useRouter()

const month = ref<number | null>(null)

const displayMonth = (params: RouteParams) => {
  const year = +params.year
  const day = +params.day

  if (day) {
    const date = getDateByDay(year, day)
    month.value = date.getMonth()
    return
  }

  const week = +params.week
  const startDay = +params.startDay

  const date = getDateByWeek(year, week)

  if (startDay) {
    date.setDate(date.getDate() + (startDay - 1))
  }

  month.value = date.getMonth()
}

const showMonth = async () => {
  if (month.value) {
    await router.push({
      name: 'schedule-month',
      params: {
        year: +route.params.year,
        month: month.value + 1,
      },
    })
  }
}

watchEffect(() => {
  displayMonth(route.params)
})
</script>
