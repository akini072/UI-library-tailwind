<template>
  <TooltipProvider>
    <Tooltip
      :delay-duration="100"
      v-bind="bindProps"
      @update:open="$emit('update:model-value', $event)"
    >
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
          {{ tooltip }}
          <slot name="content" />
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Tooltip: defineAsyncComponent(() =>
      import('@/components/shadcn/tooltip/Tooltip.vue'),
    ),
    TooltipContent: defineAsyncComponent(() =>
      import('@/components/shadcn/tooltip/TooltipContent.vue'),
    ),
    TooltipProvider: defineAsyncComponent(() =>
      import('@/components/shadcn/tooltip/TooltipProvider.vue'),
    ),
    TooltipTrigger: defineAsyncComponent(() =>
      import('@/components/shadcn/tooltip/TooltipTrigger.vue'),
    ),
  },
  props: {
    tooltip: { type: String },
    side: { type: String, required: false, default: 'bottom' },
    align: { type: String, required: false, default: 'center' },
    theme: { type: String, default: 'dark' },
    modelValue: { type: Boolean, default: null },
  },
  computed: {
    bindProps() {
      return this.modelValue !== null ? { open: this.modelValue } : {}
    },
  },
}
</script>
