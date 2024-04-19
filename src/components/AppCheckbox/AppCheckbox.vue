<template>
  <label :for="id">
    <input type="checkbox" v-model="modelValue" :disabled="disabled" name="name" :id="id" />
    <span :class="{ 'text-gray-500': disabled }">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
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
