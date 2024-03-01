<template>
  <component class="icon" :color="color" :height="height" :is="icon" />
</template>

<script>
import { defineAsyncComponent, markRaw } from "vue"
export default {
  name: "VIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    folder: {
      type: String,
      default: 'icons'
    },
    color: {
      type: String
    },
    height: {
      type: String,
      default: "20px"
    },
  },
  data() {
    return {
      icon: markRaw(
        defineAsyncComponent(() =>
          import(`../../assets/${this.folder}/${this.name}.svg`)
        )
      )
    }
  }
}
</script>
