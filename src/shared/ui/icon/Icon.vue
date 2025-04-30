<template>
  <component
    :is="icon"
    v-if="icon"
    :width="size"
    :height="size"
    :style="{ minWidth: size + 'px' }"
  />
</template>

<script setup lang="ts">
type Size = string | number

interface Props {
  name: string
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  size: '24',
})

type AsyncIconComponent = ReturnType<typeof defineAsyncComponent>

const icon = shallowRef<AsyncIconComponent>()

const loadIcon = (splitName: string[]) => {
  switch (splitName.length) {
    case 1:
      return defineAsyncComponent(() => import(`../../assets/icons/${splitName[0]}.svg`))
    case 2:
      return defineAsyncComponent(
        () => import(`../../assets/icons/${splitName[0]}/${splitName[1]}.svg`),
      )
  }
}

watchEffect(() => {
  if (props.name) {
    icon.value = loadIcon(props.name.split('/'))
  }
})
</script>
