import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppCheckbox from '@/components/AppCheckbox'

describe('AppCheckbox', () => {
  it('renders component correctly', () => {
    const wrapper = shallowMount(AppCheckbox)

    expect(wrapper.exists()).toBeTruthy()
  })
})
