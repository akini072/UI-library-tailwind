<template>
  <span
    :class="{
      'rounded-lg py-1 px-2 font-weight-medium text-capitalize': true,
      'border--error-200 text--error-700 bg--error-50': value === 'Failed' || value === 'Cancelled',
      'border--gray-200 text--gray-700 bg--gray-50': value === 'Draft' || value === 'Archieved' ,
      'border--success-200 text--success-700 bg--success-50': value === 'Succeeded' || value === 'Fulfilled' ,
      'border--warn-200 text--warn-700 bg--warn-50': value === 'Processing' || value === 'Refunded',     
    }"
  >
    {{ value }}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    }
  },
}
</script>
