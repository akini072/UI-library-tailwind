<script setup>
import VIcon from "@/components/base/VIcon.vue";
import { useCarousel } from "./useCarousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";

const props = defineProps({
  class: { type: null, required: false },
});

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button v-if="canScrollNext" :class="cn(
    'touch-manipulation absolute h-6 w-6 rounded-full p-0',
    orientation === 'horizontal'
      ? '-right-12 top-[8px] -translate-y-1/2'
      : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
    props.class,
  )
    " variant="outline" @click="scrollNext">
    <slot>
      <VIcon name="down-arrow" height="15px" />
    </slot>
  </Button>
</template>
