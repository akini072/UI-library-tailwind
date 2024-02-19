<template>
  <router-link
    class="external-link__item d-flex align-center py-3"
    target="_blank"
    :to="href"
  >
    <h6>{{ label }}</h6>
    <v-icon
      class="ml-auto pl-4"
      name="link-external"
      size="12px"
      color="var(--gray-500)"
    />
  </router-link>
</template>

<script>
import VIcon from "./VIcon.vue"
export default {
  components: { VIcon },
  props: {
    label: {
      type: String
    },
    href: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
.external-link__item:hover {
  h6 {
    color: var(--primary-500);
  }
  svg path {
    fill: var(--primary-500);
  }
}
</style>
