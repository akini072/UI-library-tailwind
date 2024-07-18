<template>
  <div class="drawer__wrapper" @click.self="$emit('close')">
    <div
      class="content d-flex"
      :style="{
        width: width,
        right: show ? 0 : `calc(-${width} + 0px)`
      }"
    >
      <loading v-if="loading" :style="{ width }" />
      <div class="d-flex flex-column">
        <div
          v-if="title"
          ref="header"
          class="d-flex justify-space-between align-center px-7 py-5 border-b"
        >
          <h4>{{ title }}</h4>
          <v-button variant="text" size="medium" icon @click="$emit('close')">
            <v-icon name="close" height="20px" color="var(--gray-500)" />
          </v-button>
        </div>
        <div v-else-if="$slots.header" ref="header" :style="{ width }">
          <slot name="header" />
        </div>
        <scroll-area
          class="flex-grow"
        >
          <div class="body">
            <slot name="body" />
          </div>
        </scroll-area>
        <div
          ref="actions"
          class="border-t px-7 py-3 actions"
          v-if="$slots.actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Drawer',
  components: {
    VButton:defineAsyncComponent(() => import('@/components/base/VButton')),
    ScrollArea: defineAsyncComponent(() => import('@/components/shadcn/scroll-area/ScrollArea')),
    Loading: defineAsyncComponent(() => import('@/components/base/Loading')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon'))
  },
  props: {
    width: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 100)
  }
}
</script>
<style lang="scss" scoped>
.drawer__wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s ease;
  z-index: 40;
  .content {
    background-color: white;
    position: absolute;
    top: 0;
    transition: right 400ms ease;
    height: 100vh;
    max-width: 100vw;

    .body {
      position: relative;
      height: 100%;
    }
    .actions {
      background-color: white;
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(50px, min-content));
      width: 100%;
    }
  }
}
</style>
