<script setup>
import { computed } from 'vue'
import {
  CheckboxIndicator,
  CheckboxRoot,
  useForwardPropsEmits,
} from 'radix-vue'
import VIcon from '@/components/base/VIcon.vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  defaultChecked: { type: Boolean, required: false },
  checked: { type: [Boolean, String], required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  name: { type: String, required: false },
  value: { type: String, required: false },
  id: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  theme: { type: String, required: false },
})
const emits = defineEmits(['update:checked'])

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer h-[18px] w-[18px] p-0 shrink-0 rounded-md border--gray-300 bg--white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground',
        theme === 'blue' ? 'data-[state=checked]:bg-[var(--primary-500)]' : 'data-[state=checked]:bg-primary',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      class="flex h-full w-full items-center justify-center text-current"
    >
      <slot>
        <v-icon name="check" height="12px" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
