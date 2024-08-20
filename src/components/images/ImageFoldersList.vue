<template>
  <ul>
    <li
      class="d-flex justify-space-between image-folder__item pointer"
      :class="{ selected: selected.id === 0 }"
      @click="() => $emit('select:folder', { id: 0 })"
    >
      <h6 class="font-weight-medium">All Images</h6>
    </li>
    <li v-for="folder in folders" :key="folder.id" class="pointer">
      <lazy
        class="d-flex justify-space-between image-folder__item"
        :class="{ selected: selected.id === folder.id }"
        @click="() => $emit('select:folder', folder)"
        :min-height="20"
        unrender
      >
        <h6 class="font-weight-medium">{{ folder.name }}</h6>
        <v-button
          class="delete__button"
          icon
          variant="text"
          size="small"
          color="red"
          @click="() => $emit('delete:folder', folder)"
        >
          <v-icon name="trash" height="14px" />
        </v-button>
      </lazy>
    </li>
  </ul>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    Lazy: defineAsyncComponent(() => import('@/components/base/Lazy')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    folders: {
      type: Object,
      default: [],
    },
    selected: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.image-folder__item {
  border-radius: 5px;
  padding: 0px 10px;
  margin-bottom: 6px;
  height: 30px;
  display: flex;
  align-items: center;

  &.selected {
    background-color: var(--primary-25);
    h6 {
      color: var(--primary-500);
    }
  }
  .delete__button {
    opacity: 0;
  }
  &:hover {
    .delete__button {
      opacity: 1;
    }
    background-color: var(--primary-25);
  }
}
</style>
