import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppCheckbox from '@/components/AppCheckbox'

describe('AppCheckbox', () => {
  it('renders component correctly', () => {
    const wrapper = shallowMount(AppCheckbox)
    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(wrapper.exists()).toBeTruthy()
    expect(label.exists()).toBeTruthy()
    expect(input.exists()).toBeTruthy()
  })

  it('compares label for and input id', () => {
    const wrapper = shallowMount(AppCheckbox)
    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.attributes().for === input.attributes().id).toBeTruthy()
  })

  it('does not contain label text when label prop is not provided', () => {
    const wrapper = shallowMount(AppCheckbox)
    const label = wrapper.find('label')

    expect(label.text().length).toBeFalsy()
  })

  it('contains label text when label prop is provided', () => {
    const labelText = 'some label text'
    const wrapper = shallowMount(AppCheckbox, {
      props: {
        label: labelText,
      },
    })

    const label = wrapper.find('label')
    expect(label.text() === labelText).toBeTruthy()
  })
})

// disabled
// name
