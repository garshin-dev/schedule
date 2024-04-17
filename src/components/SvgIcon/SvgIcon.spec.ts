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

    console.log('wrapper', wrapper.findComponent(SvgIcon).html())

    expect(wrapper.attributes().width).toBeTruthy()
    expect(wrapper.attributes().height).toBeTruthy()
  })

  it('return false if required prop "name" is missing', () => {
    const wrapper = shallowMount(SvgIcon)

    expect(wrapper.attributes().width).toBeFalsy()
    expect(wrapper.attributes().height).toBeFalsy()
  })
})
