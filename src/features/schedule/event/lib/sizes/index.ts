import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'

export function getEventOffset(startTime: string) {
  const [, minutes] = startTime.split(':')
  const value = parseInt(minutes) / 60

  return value * DEFAULT_DAY_CELL_HEIGHT
}

export function getEventHeight({ startTime, endTime }: { startTime: string; endTime: string }) {
  const [startTimeHours, startTimeMinutes] = startTime.split(':')
  const [endTimeHours, endTimeMinutes] = endTime.split(':')

  const hours = parseInt(endTimeHours) - parseInt(startTimeHours)
  const minutes = parseInt(endTimeMinutes) - parseInt(startTimeMinutes)

  const total = hours + minutes / 60

  return total * DEFAULT_DAY_CELL_HEIGHT
}
