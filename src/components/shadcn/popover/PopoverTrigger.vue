<script setup>
import { PopoverTrigger } from "radix-vue";

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
</script>

<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>

<style lang="scss" scoped>
button {
  padding: 0 !important;
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>