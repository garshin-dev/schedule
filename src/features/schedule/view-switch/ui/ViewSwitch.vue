<template>
  <Select v-model="viewOptions" placeholder="Choose" @select="viewHandler" />
</template>

<script setup lang="ts">
import { useViewSwitch } from '../model/use-view-switch'

const { viewOptions, viewHandler } = useViewSwitch()
</script>
