<template>
    <span
      class="status rounded-lg font-weight-medium d-flex align-center"
      :class="{
        'border--error-200 bg-error-50 text--error-700': value === 'Failed' || value === 'Cancelled',
        'border--gray-200 bg--gray-50 text-gray-00': value === 'Draft' || value === 'Archieved',
        'border--success-200 bg--success-50 text--success-700': value === 'Succeeded' || value === 'Fulfilled',
        'border--warning-200 bg--warning-50 text--warning-700': value === 'Processing' || value === 'Refunded',
      }"
      :style="row.is_archived ? { opacity: 0.5 } : {}"
    >
      {{ value }}
    </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    row: {
      type: Object,
    },
  },
}
</script>
<style lang="scss" scoped>
.status {
  padding: 1px 8px;
  display: inline-block;
}
</style>
