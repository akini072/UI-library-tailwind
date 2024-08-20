<template>
  <div class="d-flex tabs__wrapper px-4">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{ active: isActive(index) }"
      class="tab d-flex align-center py-2 px-4"
      @click="$emit('selected:tab', index)"
    >
      <v-icon :name="tab.icon" height="16px" />
      <span class="label">{{ tab.label }}</span>
    </div>
    <div v-if="tabs.length > 0" class="divider" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: { VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')) },
  props: {
    currentTab: {
      type: Number,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isActive(tabIndex) {
      return tabIndex === this.currentTab
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs__wrapper {
  position: relative;

  .tab {
    color: var(--primary-200);
    font-family: Inter;
    font-size: 10.972px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.286px;
    cursor: pointer;

    .label {
      display: none;
      margin-left: 8px;
    }

    &.active {
      color: var(--primary-500);
      border-bottom: 2px solid var(--primary-500);
      z-index: 1;
      .label {
        display: block;
      }
    }

    &:not(.active):hover {
      color: var(--primary-500);
      background-color: var(--primary-25);
    }
  }
  .divider {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .divider::before {
    height: 1px;
    background-color: var(--primary-200);
    display: block;
    content: ' ';
  }
}
</style>
