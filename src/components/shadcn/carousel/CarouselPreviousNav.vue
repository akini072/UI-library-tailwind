<script setup>
import VIcon from '@/components/base/VIcon.vue'
import { useCarousel } from "./useCarousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";

const props = defineProps({
  class: { type: null, required: false },
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    v-if="canScrollPrev"
    :class="
      cn(
        'touch-manipulation absolute h-6 w-6 rounded-full p-0',
        orientation === 'horizontal'
          ? '-left-12 top-[8px] -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <VIcon name="down-arrow" height="15px" />
    </slot>
  </Button>
</template>