<template>
  <Select v-model="viewOptions" placeholder="Choose" immutable @select="viewHandler" />
</template>

<script setup lang="ts">
import { useViewSwitch } from '../lib/use-view-switch.ts'

const { viewOptions, viewHandler } = useViewSwitch()
</script>
