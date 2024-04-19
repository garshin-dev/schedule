import AppCheckbox from '@/components/AppCheckbox'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof AppCheckbox> = {
  component: AppCheckbox,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof AppCheckbox>

export const Checkbox: Story = {}
