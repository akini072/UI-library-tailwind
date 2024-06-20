<script setup>
import { NavigationMenuLink, useForwardPropsEmits } from "radix-vue";
import { navigationMenuTriggerStyle } from ".";
import { cn } from "@/lib/utils";
const props = defineProps({
  active: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
const emits = defineEmits(["select"]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuLink v-bind="forwarded" :class="cn(navigationMenuTriggerStyle())">
    <slot />
  </NavigationMenuLink>
</template>
