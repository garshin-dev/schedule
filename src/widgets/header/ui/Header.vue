<template>
  <header class="border-b border-b-black/30 px-3 py-4">
    <ul class="flex gap-4">
      <li v-for="link in links" :key="link.name">
        <RouterLink v-slot="{ isActive }" :to="link.path">
          <span :class="[isActive ? 'text-black' : 'text-black/50']">
            {{ link.name }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
const links = [
  {
    name: 'Main',
    path: '/',
  },
  {
    name: 'Schedule',
    path: '/schedule',
  },
]
</script>
