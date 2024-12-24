<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Header } from '@/widgets/header'
</script>
