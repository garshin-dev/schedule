export function getWeeks(year: number) {
  const lastWeek = getLastWeekNumber(year)

  return Array.from({ length: lastWeek }).map((_, i) => i + 1)
}

function getLastWeekNumber(year: number) {
  const date = new Date(year, 11, 31)
  const weekNumber = getISOWeek(date)

  if (weekNumber === 1) {
    const date28Dec = new Date(year, 11, 28)
    return getISOWeek(date28Dec)
  }

  return weekNumber
}

function getISOWeek(date: Date) {
  const tempDate = new Date(date.valueOf())
  tempDate.setHours(0, 0, 0, 0)
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7))

  const week1 = new Date(tempDate.getFullYear(), 0, 4)

  return 1 + Math.round(((tempDate - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}
