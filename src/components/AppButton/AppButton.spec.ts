import { describe, expect, it } from 'vitest'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import AppButton from './AppButton.vue'
import SvgIcon from '@/components/SvgIcon'

describe('AppButton', () => {
  it('renders', () => {
    const wrapper = shallowMount(AppButton)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders text', () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        default: 'Button text',
      },
    })

    expect(wrapper.text()).toBe('Button text')
  })

  it('renders as a Button', () => {
    const wrapper = shallowMount(AppButton)
    const button = wrapper.find('button')

    expect(button.exists()).toBeTruthy()
  })

  it('renders as a RouterLink', () => {
    const wrapper = shallowMount(AppButton, {
      props: {
        to: '/about/',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/about/')
  })

  it('should have target', () => {
    const wrapper = shallowMount(AppButton, {
      props: {
        to: '/',
        target: '__blank',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.findComponent(RouterLinkStub).attributes().target).toBe('__blank')
  })

  it('renders icon when icon prop is provided', () => {
    const wrapper = shallowMount(AppButton, {
      props: {
        icon: 'notification',
      },
    })

    expect(wrapper.findComponent(SvgIcon).exists()).toBeTruthy()
  })

  it('does not render icon when icon prop is not provided', () => {
    const wrapper = shallowMount(AppButton, {})

    expect(wrapper.findComponent(SvgIcon).exists()).toBeFalsy()
  })
})
