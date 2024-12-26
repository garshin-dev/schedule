<template>
  <div class="flex flex-col gap-1 relative">
    <div class="flex" @click="toggleDropdown">
      <input
        type="text"
        class="cursor-pointer focus-visible:outline-none focus-visible:border-black border border-black/50"
        :placeholder="placeholder"
        :value="selectedItem?.name || ''"
        readonly
        @keydown.enter="toggleDropdown"
      >
    </div>
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300"
      leave-to-class="opacity-0"
    >
      <div class="flex flex-col absolute bg-white border border-black z-10 top-full mt-0.5 w-full" v-show="isShow">
        <ul class="flex flex-col">
          <li
            v-for="item in modelItems"
            :key="item.name"
          >
            <button
              class="w-full flex"
              @click="selectHandler(item)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Item } from './select.type'

interface Props {
  placeholder: string
}

type Emits = {
  (e: 'select', item: Item): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const modelItems = defineModel<Item[]>({ required: true })

const isShow = ref<boolean>(false)
const selectedItem = computed(() => modelItems.value.find(item => item.selected))

const toggleDropdown = () => {
  isShow.value = !isShow.value
}

const selectHandler = (item: Item) => {
  isShow.value = false

  modelItems.value.forEach(modelItem => {
    modelItem.selected = modelItem.value === item.value
  })

  emit('select', item)
}
</script>
