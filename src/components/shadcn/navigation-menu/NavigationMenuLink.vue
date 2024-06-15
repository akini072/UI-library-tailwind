<script setup>
import { NavigationMenuLink, useForwardPropsEmits } from "radix-vue";
// import navigationMenuTriggerStyle from './NavigationMenuTrigger.vue'
const props = defineProps({
  active: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  isActive: { type: Boolean, required: false }
});
const emits = defineEmits(["select"]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuLink v-bind="forwarded" :class="{ active: isActive }"
    class="group inline-flex h-10 text-[var(--gray-700)] w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-[var(--bg-white)] hover:text-[var(--primary-500)] focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-slate-100/50 data-[state=open]:bg-slate-100/50 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:bg-slate-800/50 dark:data-[state=open]:bg-slate-800/50">
    <slot />
  </NavigationMenuLink>
</template>

<style lang="scss">
.active {
  font-weight: 500;
  background-color: var(--primary-25);
  color: var(--primary-500);
  align-items: center;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}
</style>