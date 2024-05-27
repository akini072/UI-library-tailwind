<template>
  <div class="popup-container">
    <div
      class="content rounded"
      :class="{
        small: small,
        large: large,
        medium: medium,
        loading: loading,
      }"
      :style="{
        width,
      }"
    >
      <loading v-if="loading" class="loading__spinner" />
      <div v-if="title">
        <div class="d-flex justify-space-between align-center px-5 py-2">
          <h5>
            {{ title }}
          </h5>
          <v-button variant="text" size="medium" icon @click="$emit('close')">
            <v-icon name="close" height="20px" color="var(--gray-500)" />
          </v-button>
        </div>
        <div class="divider" />
      </div>
      <slot name="body" />

      <div class="border-t px-5 py-3 actions" v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
<script>
import VIcon from './VIcon.vue'
import VButton from './VButton.vue'
import Loading from './Loading.vue'

export default {
  name: 'VPopup',
  components: {
    VButton,
    VIcon,
    Loading,
  },
  props: {
    width: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
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
    width: 100%;
    max-width: calc(100vw - 40px);
    max-height: 90vh;

    &.small {
      width: 400px;
    }
    &.medium {
      width: 620px;
    }
    &.large {
      width: 800px;
    }
    .actions {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(50px, min-content));
      justify-content: end;
    }
    .loading__spinner {
      border-radius: 8px;
    }
  }
  @media screen and (max-width: 960px) {
    .content {
      width: 96vw;
    }
  }
  @media screen and (min-width: 1900px) {
    .content {
      max-width: 1860px;
    }
  }
}
</style>
