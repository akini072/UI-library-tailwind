<template>
  <span
    :class="{
      'rounded-lg py-1 px-2 font-weight-medium text-capitalize': true,
      'border--success-200 text--success-700 bg--success-50': value === activeValue,
      'border--gray-200 text--gray-700 bg--gray-50': value !== activeValue,
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
    },
    activeValue: {
      type: String,
      default: 'active'
    }
  },
}
</script>
