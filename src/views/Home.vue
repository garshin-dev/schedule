<script setup lang="ts">
import AppButton from '@/components/AppButton'

console.log('Home')
</script>

<template>
  <div class="text-red-600">
    <h1>This is a home page</h1>
    <AppButton
      to="/about/"
    >
      Some btn
    </AppButton>
    <AppButton
      type="secondary"
    >
      Oara Иее btn
    </AppButton>
  </div>
</template>