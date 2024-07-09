<template>
  <div class="icon d-flex">
    <component
      :is="icon"
      :color="color"
      :height="height"
      :width="width || height"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    height: {
      type: String,
      default: '20px',
    },
    width: {
      type: String,
      default: '',
    },
    folder: {
      type: String,
      default: 'icons',
    },
  },
  computed: {
    icon() {
      return defineAsyncComponent(() =>
        import(`../../assets/icons/${this.name}.svg`),
      )
    },
  }
}
</script>
