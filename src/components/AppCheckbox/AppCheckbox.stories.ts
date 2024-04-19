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

export const DefaultCheckbox: Story = {
  args: {
    label: 'label',
  },
}

export const CheckedCheckbox: Story = {
  args: {
    modelValue: true,
    label: 'label',
  },
}

export const DisabledCheckbox: Story = {
  args: {
    disabled: true,
    label: 'label',
  },
}

export const CheckedAndDisabledCheckbox: Story = {
  args: {
    modelValue: true,
    disabled: true,
    label: 'label',
  },
}
