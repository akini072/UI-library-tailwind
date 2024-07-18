<script setup>
import { computed } from 'vue'
import { DropdownMenuItem, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  inset: { type: Boolean, required: false },
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>

<style lang="scss" scoped>
.color--blue {
  &.active,
  &:hover {
    background-color: var(--primary-25);
    color: var(--primary-500);
  }

  &.active {
    font-weight: 500;
  }
}
</style>
