import { describe, expect, it } from 'vitest'
import { getLastDayOfMonth, getFirstDayOfMonth } from './index'

describe('getLastDayOfMonth', () => {
  it('should return last day of January', () => {
    const month = new Date(2024, 0, 15)
    const result = getLastDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(31)
  })

  it('should return last day of December', () => {
    const month = new Date(2024, 11, 25)
    const result = getLastDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(11)
    expect(result.getDate()).toBe(31)
  })

  it('should handle leap year February', () => {
    const month = new Date(2024, 1, 15)
    const result = getLastDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(29)
  })

  it('should handle non-leap year February', () => {
    const month = new Date(2023, 1, 15)
    const result = getLastDayOfMonth(2023, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2023)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(28)
  })

  it('should handle different year parameter', () => {
    const month = new Date(2024, 5, 15)
    const result = getLastDayOfMonth(2025, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(5)
    expect(result.getDate()).toBe(30)
  })
})

describe('getFirstDayOfMonth', () => {
  it('should return first day of January', () => {
    const month = new Date(2024, 0, 15)
    const result = getFirstDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(0)
    expect(result.getDate()).toBe(1)
  })

  it('should return first day of December', () => {
    const month = new Date(2024, 11, 25)
    const result = getFirstDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(11)
    expect(result.getDate()).toBe(1)
  })

  it('should handle leap year February', () => {
    const month = new Date(2024, 1, 15)
    const result = getFirstDayOfMonth(2024, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2024)
    expect(result.getMonth()).toBe(1)
    expect(result.getDate()).toBe(1)
  })

  it('should handle different year parameter', () => {
    const month = new Date(2024, 5, 15)
    const result = getFirstDayOfMonth(2025, month.getMonth() + 1)

    expect(result.getFullYear()).toBe(2025)
    expect(result.getMonth()).toBe(5)
    expect(result.getDate()).toBe(1)
  })
})
