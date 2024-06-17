<script setup>
import { computed } from "vue";
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from "radix-vue";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  value: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  textValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false }
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="cn(
    'select-item relative flex w-full cursor-pointer select-none items-center rounded-sm pl-5 pr-2.5 py-1.5 text-base font-medium text-[var(--gray-700)] hover:text-[var(--primary-500)] outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50',
    props.class
  )">
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator class="item-indicator">
        <Check class="h-4 w-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<style lang="scss">
.select-item {
  &:hover {
    & .select-icon {
      & svg {
        fill: var(--primary-500);
      }
    }
    & .item-indicator {
      & > svg {
        stroke: var(--primary-500);
      }
    }
  }
}
</style>
