<script setup>
import { NavigationMenuItem } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  value: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: {type: String, required: false}
});
</script>

<template>
  <NavigationMenuItem v-bind="props"
  :class="
      cn(
        'group inline-flex text-[var(--gray-700)] w-max items-center justify-center rounded-md bg-white px-4 text-base font-medium transition-colors hover:bg-[var(--bg-white)] hover:text-[var(--primary-500)] focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-slate-100/50 data-[state=open]:bg-slate-100/50 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[active]:bg-slate-800/50 dark:data-[state=open]:bg-slate-800/50',
        props.class,
      )
    ">
    <slot />
  </NavigationMenuItem>
</template>