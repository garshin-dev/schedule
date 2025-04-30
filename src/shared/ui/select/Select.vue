<template>
  <div ref="selectRef" class="relative flex flex-col gap-1">
    <div class="relative flex" @click="toggleDropdown">
      <input
        type="text"
        class="cursor-pointer rounded border border-black/50 px-2 py-1 focus-visible:border-black focus-visible:outline-none"
        :placeholder="placeholder"
        :value="selectedItem?.name || ''"
        readonly
        @keydown.enter="toggleDropdown"
        @keydown.esc="closeDropdown"
      />
      <Icon
        name="arrow"
        class="anim pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
        :class="{ 'rotate-180': isShow }"
      />
    </div>
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isShow"
        class="absolute top-full z-50 mt-0.5 flex w-full flex-col rounded border border-black bg-white"
      >
        <ul class="flex flex-col">
          <li v-for="item in modelItems" :key="item.name">
            <button
              class="anim flex w-full px-2 py-1 hover:bg-black/10"
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

<script setup lang="ts" generic="T extends Item">
import { onClickOutside } from '@vueuse/core'
import type { Item } from './select.type'

interface Props {
  placeholder: string
  immutable?: boolean
}

type Emits = {
  (e: 'select', item: T): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const modelItems = defineModel<T[]>({ required: true })

const selectRef = ref<HTMLDivElement>()

const isShow = ref<boolean>(false)
const selectedItem = computed<T | undefined>(() => modelItems.value.find((item) => item.selected))

const toggleDropdown = () => {
  isShow.value = !isShow.value
}

const closeDropdown = () => {
  isShow.value = false
}

const selectHandler = (item: T) => {
  closeDropdown()

  if (!props.immutable) {
    modelItems.value.forEach((modelItem) => {
      modelItem.selected = modelItem.value === item.value
    })
  }

  emit('select', item)
}

onClickOutside(selectRef, closeDropdown)
</script>
