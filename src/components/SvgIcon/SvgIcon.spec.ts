import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon'

describe('SvgIcon', () => {
  it('should render', () => {
    const wrapper = shallowMount(SvgIcon, {
      props: {
        name: 'notification',
      },
    })

    expect(wrapper.exists()).toBeTruthy()
  })
})
