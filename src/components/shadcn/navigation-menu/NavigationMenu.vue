<script setup>
import { computed } from "vue";
import { NavigationMenuRoot, useForwardPropsEmits } from "radix-vue";
import NavigationMenuViewport from "./NavigationMenuViewport.vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: { type: String, required: false },
  defaultValue: { type: String, required: false },
  dir: { type: String, required: false },
  orientation: { type: String, required: false },
  delayDuration: { type: Number, required: false },
  skipDelayDuration: { type: Number, required: false },
  disableClickTrigger: { type: Boolean, required: false },
  disableHoverTrigger: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(["update:modelValue"]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <NavigationMenuRoot
    v-bind="forwarded"
    :class="
      cn(
        'relative z-10 flex max-w-max flex-1 items-center justify-center',
        props.class,
      )
    "
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
