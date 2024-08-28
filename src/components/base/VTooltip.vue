<script setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/tooltip'
const props = defineProps({
  tooltip: { type: String, required: true },
  side: { type: String, required: false, default: 'bottom' },
  align: { type: String, required: false, default: 'center' },
  theme: { type: String, default: 'dark' },
  modelValue: { type: Boolean },
})
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="100" :open="modelValue" @update:open="$emit('update:model-value', $event)">
      <TooltipTrigger as="div">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        class="d-flex align-center"
        :class="{
          'bg-[#404242]': theme === 'dark',
          'bg-[#fff]': theme === 'light-padding' || theme === 'light',
        }"
        :align="align"
        :side="side"
        :side-offset="16"
      >
        <span
          class="text-sm"
          :class="{
            'text--white': theme === 'dark',
            'text--gray-700': theme === 'light-padding' || theme === 'light',
          }"
        >
          {{ props.tooltip }}
          <slot name="content" />
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
