<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
  animated: { type: Boolean, default: true },
})
</script>

<template>
  <div
    :class="
      cn(
        'rounded-sm bg-muted',
        props.class,
        props.animated ? 'animate-pulse' : '',
      )
    "
  />
</template>
