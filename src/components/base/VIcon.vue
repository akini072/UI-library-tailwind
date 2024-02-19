<template>
  <div class="icon-wrapper">
    <component
      class="icon"
      :height="size"
      :width="size"
      :color="color || 'var(--gray-700)'"
      :is="icon"
    />
  </div>
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
    size: {
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

<style scoped>
.icon-wrapper {
  display: flex;
}

.icon {
  width: inherit; 
  height: inherit;
}
</style>
