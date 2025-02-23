import { describe, expect, it } from 'vitest';
import { getLastDayOfMonth } from './index'

describe('getLastDayOfMonth', () => {
  it('should return the last day of the month', () => {
    const year = 2025
    const month = 1

    const monthDate = new Date(year, month)

    const lastDay = getLastDayOfMonth(year, monthDate)

    const date = new Date(year, 1, 28)

    expect(lastDay).toEqual(date);
  });
});
