<template>
  <label class="group inline-flex cursor-pointer items-start gap-2.5" :for="id">
    <input
      type="checkbox"
      v-model="modelValue"
      :disabled="disabled"
      class="peer absolute appearance-none"
      name="name"
      :id="id"
    />
    <span
      class="border-amber-500 flex size-5 min-w-5 items-center justify-center rounded border border-gray-secondary transition duration-300 group-hover:border-blue peer-checked:border-blue peer-checked:bg-blue peer-disabled:bg-gray-secondary peer-checked:[&>*]:opacity-100"
    >
      <SvgIcon name="checkbox" class="opacity-0" />
    </span>
    <span class="text-md peer-disabled:text-gray-secondary">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'

interface AppCheckboxInterface {
  label?: string
  disabled?: boolean
  name?: string
}

withDefaults(defineProps<AppCheckboxInterface>(), {
  name: 'checkbox-' + Math.random(),
})

const id = Math.random().toString()
const modelValue = defineModel<boolean>()
</script>
