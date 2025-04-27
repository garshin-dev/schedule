import { describe, it, expect } from 'vitest'
import { getYearDates } from '@/widgets/schedule/views/year/lib/date/index.ts'

describe('getYearDates', () => {
  it('should return array of size 12', () => {
    const year = 2025
    const result = getYearDates(year)

    expect(result.length).toBe(12)
  })
})
