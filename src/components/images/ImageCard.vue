<template>
  <div class="image__card border pointer">
    <div class="img__wrapper d-flex align-center justify-center">
      <img
        v-if="image.url && !error"
        v-lazy="{
          src: image.url,
          lifecycle: { error: () => (error = true) }
        }"
      />
      <v-icon v-else-if="error" name="image-empty" height="50px" />
    </div>
    <v-button
      class="delete__button"
      v-tippy
      content="Delete image"
      variant="text"
      color="red"
      size="small"
      icon
      @click.stop="$emit('show:delete', image)"
    >
      <v-icon name="trash" height="16px" />
    </v-button>
    <div class="label text-ellipsis">
      {{ image.name }}
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    image: {
      type: Object
    }
  },
  data() {
    return {
      error: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.image__card {
  border-radius: 5px;
  height: 160px;
  padding: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  .img__wrapper {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    img {
      height: 100%;
      width: 100%;
      background-color: var(--gray-50);
      object-fit: scale-down;
    }
  }
  .delete__button {
    position: absolute;
    top: 10px;
    left: 10px;
    opacity:0;
  }
  .label {
    font-size: 10px;
    color: var(--gray-300);
  }

  &:hover {
    border-color: var(--primary-500);
    .delete__button {
      opacity: 1;
    }
  }
}
</style>
