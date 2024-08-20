<template>
  <a
    class="external-link__item d-flex align-center"
    target="_blank"
    @click="redirect"
  >
    <div class="label">
      <h6 v-if="label">{{ label }}</h6>
      <slot v-else />
    </div>
    <v-icon
      class="ml-auto pl-4"
      name="link-external"
      :height="iconSize"
      color="var(--gray-500)"
    />
  </a>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: { VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')) },
  props: {
    label: {
      type: String,
    },
    href: {
      type: String,
    },
    iconSize: {
      type: String,
      default: '12px'
    }
  },
  methods: {
    redirect() {
      window.open(this.href, '_blank')
    },
  },
}
</script>
<style lang="scss" scoped>
.external-link__item .label {
  color: var(--gray-500);
}
.external-link__item:hover {
  .label, h6 {
    color: var(--primary-500);
  }
  svg path {
    fill: var(--primary-500);
  }
}
</style>
