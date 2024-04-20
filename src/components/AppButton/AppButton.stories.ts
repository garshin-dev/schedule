import AppButton from './AppButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof AppButton> = {
  component: AppButton,
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary'] },
    to: { control: 'text' },
    disabled: { control: 'boolean' },
    target: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof AppButton>

export const Primary: Story = {
  args: {
    default: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    default: 'Button',
    type: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    default: 'Button',
    type: 'danger',
  },
}

export const Link: Story = {
  args: {
    default: 'Button',
    to: '/',
  },
}
