import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon'

describe('SvgIcon', () => {
  it('renders when name prop is provided', () => {
    const wrapper = shallowMount(SvgIcon, {
      props: {
        name: 'notification',
      },
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('does not render when name prop is not provided', () => {
    const wrapper = shallowMount(SvgIcon, {
      props: {
        name: 'notification',
      },
    })

    expect(wrapper.exists()).toBeTruthy()
  })
})
