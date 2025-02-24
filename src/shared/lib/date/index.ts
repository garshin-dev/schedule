export function getDatesInRange(limit?: number, date?: Date) {
  const firstDay = date || new Date()
  firstDay.setHours(0, 0, 0, 0)

  const day = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const count = limit || (day > 1 ? 7 - day : 7)
  const weekDates = []

  for (let i = 0; i < count; i++) {
    const day = new Date(firstDay)
    day.setDate(firstDay.getDate() + i)
    weekDates.push(day)
  }

  return weekDates
}

export function getWeekNumber(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function getDateByWeek(year: number, week: number) {
  // Создаем дату на 4 января указанного года (всегда попадает на первую неделю по ISO)
  const date = new Date(year, 0, 4)
  
  // Получаем понедельник той недели, на которую попадает 4 января
  const firstWeekStart = new Date(date.setDate(date.getDate() - (date.getDay() || 7) + 1))
  
  // Добавляем нужное количество недель
  firstWeekStart.setDate(firstWeekStart.getDate() + (week - 1) * 7)
  
  return firstWeekStart
}