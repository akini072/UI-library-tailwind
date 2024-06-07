<template>
  <div
    class="menu-item py-2 px-3"
    :class="{ separator: label === '', 'has-icon': !!icon, disabled, active }"
  >
    <template v-if="label !== ''">
      <div v-if="icon" class="d-flex mr-2">
        <v-icon :name="icon" color="var(--gray-500)" height="16px" />
      </div>
      <span class="font-weight-regular">{{ label }}</span>
    </template>
  </div>
</template>

<script>
import VIcon from '@/components/base/VIcon.vue'

export default {
  name: 'menu-item',
  components: { VIcon },
  props: ['icon', 'label', 'disabled', 'active']
}
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0;
  min-width: 80px;
  span {
    line-height: 16px;
  }
  cursor: pointer;
  position: relative;
  &:hover {
    background: var(--gray-100);
  }
  &.active {
    background: #dce9ff;
    color: #116dff;
  }
  .icon {
    height: 16px;
  }
  &.separator {
    pointer-events: none;
    border-top: 1px solid var(--gray-200);
    padding: 0;
  }
  &.disabled {
    pointer-events: none;
    .mi-label {
      color: var(--gray-400);
    }
    .icon {
      color: var(--gray-400);
    }
  }
  .icon {
    width: 20px;
  }
  &.has-icon {
  }
  .mi-label {
    left: 40px;
    //position: absolute;
    margin-left: 5px;
    color: var(--gray-700);
  }
}
</style>
