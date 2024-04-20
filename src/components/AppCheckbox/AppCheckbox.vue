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
    <span class="peer-disabled:border-gray-2"></span>
    <span
      class="border-amber-500 mt-0.5 flex size-5 min-w-5 items-center justify-center rounded border border-gray-2 transition duration-300 group-hover:enabled:border-blue peer-checked:border-blue peer-checked:bg-blue peer-disabled:border-gray-2 peer-disabled:bg-gray-2 peer-checked:[&>*]:opacity-100"
    >
      <SvgIcon name="checkbox" class="opacity-0" />
    </span>
    <span class="text-md peer-disabled:text-gray-2">{{ label }}</span>
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
