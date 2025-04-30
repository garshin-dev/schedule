<template>
  <Select v-model="TimeUnitOptions" placeholder="Choose" immutable @select="timeUnitHandler" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { MONTHS } from '@/shared/constants/date'
import type { Item } from '@/shared/ui/select'
import { getWeeks } from '../lib/date.ts'
import { TimeUnits } from '../model/time-unit-switch.types.ts'

const router = useRouter()
const route = useRoute()

interface Props {
  type: TimeUnits
}

const props = defineProps<Props>()

const TimeUnitOptions = ref<Item[]>([])

const setTimeUnits = () => {
  const params = route.params

  switch (props.type) {
    case TimeUnits.Months:
      TimeUnitOptions.value = MONTHS.map((month, index) => ({
        name: month,
        value: index + 1,
        selected: month === MONTHS[+params.month - 1],
      }))
      break
    case TimeUnits.Weeks:
      const weeks = getWeeks(+params.year)

      TimeUnitOptions.value = weeks.map((week) => ({
        name: week,
        value: week,
        selected: week === +params.week,
      }))
      break
    case TimeUnits.Years:
      TimeUnitOptions.value = [2024, 2025].map((year) => ({
        name: year,
        value: year,
        selected: year === +params.year,
      }))
      break
  }
}

const timeUnitHandler = async (option: Item) => {
  const params = route.params

  switch (props.type) {
    case TimeUnits.Months:
      await router.push({
        name: 'schedule-month',
        params: {
          year: params.year,
          month: option.value,
        },
      })
      break
    case TimeUnits.Weeks:
      await router.push({
        name: 'schedule-week',
        params: {
          year: params.year,
          week: option.value,
        },
      })
      break
    case TimeUnits.Years:
      await router.push({
        name: 'schedule-year',
        params: {
          year: option.value,
        },
      })
      break
  }
}

watchEffect(setTimeUnits)
</script>
