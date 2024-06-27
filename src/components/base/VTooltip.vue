<script setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/tooltip'
const props = defineProps({
  tooltip: { type: String, required: true },
  side: { type: String, required: false, default: 'bottom'}
})
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent
        class="d-flex align-center bg-[#404042]"
        :side="side"
        :side-offset="16"
      >
        <span class="text--white text-sm">{{ props.tooltip }}</span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
