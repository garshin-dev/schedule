import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'

export function getEventOffset(timeStart: string) {
  const [, minutes] = timeStart.split(':')
  const value = parseInt(minutes) / 60

  return value * DEFAULT_DAY_CELL_HEIGHT
}

export function getEventHeight({ timeStart, timeEnd }: { timeStart: string; timeEnd: string }) {
  const [timeStartHours, timeStartMinutes] = timeStart.split(':')
  const [timeEndHours, timeEndMinutes] = timeEnd.split(':')

  const hours = parseInt(timeEndHours) - parseInt(timeStartHours)
  const minutes = parseInt(timeEndMinutes) - parseInt(timeStartMinutes)

  const total = hours + minutes / 60

  return total * DEFAULT_DAY_CELL_HEIGHT
}
