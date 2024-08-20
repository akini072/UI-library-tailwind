<template>
  <div
    v-tippy="{ theme: 'light', content: info }"
    class="select__button border rounded pa-2 d-flex flex-column align-center pointer"
    :class="{ selected: modelValue === value }"
    @click="$emit('update:model-value', value)"
  >
    <v-icon
      v-if="icon"
      :name="icon"
      :height="iconSize"
      class="mb-2"
      color="var(--primary-500)"
    />
    <p
      class="text--gray-500 text-nowrap"
      :class="{ 'font-weight-medium': bold }"
    >
      {{ title }}
    </p>
    <h6
      v-if="subtitle"
      class="mt-1 text--primary text-nowrap font-weight-medium"
    >
      {{ subtitle }}
    </h6>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: { VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')) },
  props: {
    selected: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    info: {
      type: String,
    },
    iconSize: {
      type: String,
      default: "40px",
    },
    bold: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    modelValue: {
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.select__button {
  border-width: 2px;
  transition: border 300ms ease;
  &:hover {
    border-color: var(--primary-500);
  }

  &.selected {
    border-color: var(--primary-500);
  }
}
</style>
