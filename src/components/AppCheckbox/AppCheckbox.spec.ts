import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppCheckbox from '@/components/AppCheckbox'

describe('AppCheckbox', () => {
  it('renders component correctly', () => {
    const wrapper = shallowMount(AppCheckbox)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('compares label for and input id', () => {
    const wrapper = shallowMount(AppCheckbox)

    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.exists()).toBeTruthy()
    expect(input.exists()).toBeTruthy()
    expect(label.attributes().for === input.attributes().id).toBeTruthy()
  })
})

// label
// disabled
// name
