<script setup>
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps({
  defaultValue: { type: [String, Number], required: false },
  modelValue: { type: [String, Number], required: false },
  class: { type: null, required: false },
});

const emits = defineEmits(["update:modelValue", 'generateToggleSearchResutlsDropdown', 'generateCloseSearchDropdown']);


const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
const toggleSearchResutlsDropdown = () =>{
  emits('generateToggleSearchResutlsDropdown')
}
const closeSearchDropdown = () => {
  emits('generateCloseSearchDropdown')
}
</script>

<template>
  <input
    v-model="modelValue"
    @focus="toggleSearchResutlsDropdown"
    @blur="closeSearchDropdown"
    :class="
      cn(
        'flex w-full rounded-md bg-white px-8 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
        props.class,        
      )
    "
  />
</template>
