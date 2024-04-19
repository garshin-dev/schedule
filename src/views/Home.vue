<script setup lang="ts">
import AppButton from '@/components/AppButton'
import AppCheckbox from '@/components/AppCheckbox'
import { ref } from 'vue'

const serviceCheckbox = ref<boolean>(false)
</script>

<template>
  <div class="text-red-600">
    <h1>This is a home page</h1>
    <div class="flex flex-col">
      <AppButton icon="notification"> Btn with icon </AppButton>
    </div>
    <div>
      <AppCheckbox v-model="serviceCheckbox" label="выбрать услугу" />

      serviceCheckbox: {{ serviceCheckbox }}
    </div>
  </div>
</template>
