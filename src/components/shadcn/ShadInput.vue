<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { Input } from '@/components/shadcn/input'
const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
  icon: {type: Object, required: false},
  placeholder: {type: String, required: false},
  width: {type: String, required: false},
  focus: {type: Function, required: false}
});

const emits = defineEmits(["update:modelValue", "sendToggleSearchResutlsDropdown", 'sendCloseSearchDropdown']);

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
const receiveToggleSearchResultsDropdown = () => {
  emits('sendToggleSearchResutlsDropdown')
}
const receiveCloseSearchDropdown = () => {
  emits('sendCloseSearchDropdown')
}
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input id="search" v-model="modelValue" @generateToggleSearchResutlsDropdown="receiveToggleSearchResultsDropdown" @generateCloseSearchDropdown="receiveCloseSearchDropdown" :defaultValue="defaultValue" :class="class" :width="width" type="text" :placeholder="placeholder" />
    <span class="absolute inset-y-0 flex items-center justify-center px-1">
      <component :is="icon" />
    </span>
  </div>
</template>

