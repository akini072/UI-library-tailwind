<template>
  <div
    class="popup-container"
    :style="{
      display: show ? 'block' : 'none'
    }"
  >
    <div
      class="content rounded"
      :style="{
        width
      }"
    >
      <div class="d-flex justify-space-between align-center px-5 py-4">
        <h5>
          {{ title }}
        </h5>
        <v-button variant="text" size="medium" icon @click="$emit('close')">
          <v-icon name="close" height="20px" color="var(--gray-500)" />
        </v-button>
      </div>
      <div class="divider" />
      <div style="position: relative">
        <slot name="body" />
      </div>
      <div class="border-t px-5 py-3 d-flex justify-end" v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
<script>
import VIcon from './VIcon.vue'
import VButton from './VButton.vue'

export default {
  components: {
    VButton,
    VIcon
  },
  props: {
    show: {
      type: Boolean
    },
    width: {
      type: String,
      default: '1380px'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s ease;
  z-index: 99;
  .content {
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: calc(100vw - 40px);
    max-height: 793px;
  }
  @media screen and (max-width: 960px) {
    .content {
      max-width: 96vw;
    }
  }
}
</style>
