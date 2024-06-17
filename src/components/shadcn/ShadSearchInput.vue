<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ShadInput } from '@/components/shadcn/input'
import { cn } from "@/lib/utils";
const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
  icon: {type: Object, required: false},
  placeholder: {type: String, required: false},
  width: {type: Number, required: false},
  focus: {type: Function, required: false}
});

const emits = defineEmits(["update:modelValue", "focus", 'blur']);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

</script>

<template>
  <div class="relative w-full items-center">
    <ShadInput id="search" v-model="modelValue" @focus="emits('focus')" @blur="emits('blur')" :defaultValue="defaultValue" :class="cn('pl-10 rounded-lg h-[28px] hover:border-[#a9aab4] focus:outline-none focus:border-transparent focus:shadow-search-focus w-[50vw] md:w-full placeholder:text-[var(--gray-300)] placeholder:font-normal', props.class)" :width="width" type="text" :placeholder="placeholder" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
      <component :is="icon" />
    </span>
  </div>
</template>

