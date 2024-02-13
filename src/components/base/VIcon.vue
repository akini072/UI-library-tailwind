<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const Icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))
</script>

<template>
  <Icon />
</template>