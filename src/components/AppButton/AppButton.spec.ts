import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton', () => {
  it('should render', () => {
    const wrapper = mount(AppButton)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render text', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Button text'
      }
    })

    expect(wrapper.text()).toBe('Button text')
  })

  it('renders as a Button', () => {
    const wrapper = mount(AppButton)
    const button = wrapper.find('button')

    expect(button.exists()).toBeTruthy()
  })

  it('renders as a RouterLink', () => {
    const wrapper = mount(AppButton, {
      props: {
        to: '/some/'
      },
      slots: {
        default: 'Link text'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    console.log('----------- wrapper', wrapper.element)
    console.log('----------- wrapper', wrapper.attributes())

    expect(wrapper.attributes().to).toBe('/some/')
  })
})