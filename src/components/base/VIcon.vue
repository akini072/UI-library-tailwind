<template>
  <div class="icon d-flex">
    <component :is="iconComponent" :color="color" :height="height" :width="width || height" />
  </div>
</template>

<script>
import { defineAsyncComponent, markRaw } from 'vue'

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
    }
  },
  data() {
    return {
      iconComponent: null,
    }
  },
  watch: {
    name: 'loadIconComponent',
  },
  created() {
    this.loadIconComponent();
  },
  methods: {
    loadIconComponent() {
      this.iconComponent = markRaw(defineAsyncComponent(() => import(`../../assets/icons/${this.name}.svg`)));
    },
  }
}
</script>
