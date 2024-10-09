<template>
  <div class="d-flex text--gray-700 title__cell">
    <p class="font-weight-medium">
      <slot v-if="$slots.default" />
      <span v-else>
        {{ row.title }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.title__cell {
  display: flex;
  align-items: center;
  min-width: 280px;
  cursor: pointer;
  color: var(--gray-700);

  &:hover {
    color: var(--primary-500);
    text-decoration: underline;
  }
}
</style>
