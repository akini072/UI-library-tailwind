<script setup>
import { computed } from "vue";
import { SelectIcon, SelectTrigger, useForwardProps } from "radix-vue";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  disabled: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  isOpen: { type: Boolean, required: false, default: true },
  hasCheckIcon: { type: Boolean, required: false, default: true }
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger v-bind="forwardedProps" :class="cn(
    'select-trigger flex h-12 w-full items-center justify-between rounded-md bg-[var(--gray-100)] !px-5.5 py-3 border-none shadow-none text-base font-medium text-[var(--gray-700)] hover:text-[var(--primary-500)] placeholder:text-slate-500 focus:outline-none focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300',
    props.class,
  )
    ">
    <slot />
    <SelectIcon as-child v-if="hasCheckIcon">
      <ChevronDown v-if="!isOpen" class="w-4 h-4 stroke-[var(--gray-600)]" />
      <ChevronUp v-else class="w-4 h-4 stroke-[var(--gray-600)]" />
    </SelectIcon>
  </SelectTrigger>
</template>

<style lang="scss">
.select-trigger {
  &:hover {
    &>svg {
      stroke: var(--primary-500);
    }

    & .select-icon {
      & svg {
        fill: var(--primary-500);
      }
    }
  }
}

.footer-hover{
  width: 70px;
  &:hover {
    &>svg {
      stroke: var(--gray-700)
    }

    & .select-icon {
      & svg {
        fill: var(--gray-700)
      }
    }
  }
}

.select-icon {
  & svg {
    fill: var(--gray-700);
  }
}
</style>
