<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  folder: {
    type: String,
    required: true
  }
})

const Icon = defineAsyncComponent(() => import(`../../assets/${props.folder}/${props.name}.svg`))
</script>

<template>
  <Icon />
</template>