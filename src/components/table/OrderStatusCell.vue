<template>
    <span
      class="status d-flex align-center"
      :class="{
        failed: value === 'Failed' || value === 'Cancelled',
        archived: value === 'Draft' || value === 'Archieved',
        success: value === 'Succeeded' || value === 'Fulfilled',
        processing: value === 'Processing' || value === 'Refunded',
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
};
</script>
<style lang="scss" scoped>
.status {
  font-weight: 500;
  padding: 1px 8px;
  border-radius: 16px;
  display: inline-block;

  &.success {
    border: 1px solid #abefc6;
    background-color: #ecfdf3;
    color: #067647;
  }

  &.processing {
    border: 1px solid #fedf89;
    background-color: #fffaeb;
    color: #b54708;
  }

  &.failed {
    border: 1px solid #fecdca;
    background-color: #fef3f2;
    color: #b42318;
  }

  &.archived {
    border: 1px solid #e4e6f1;
    background-color: #f9fafb;
    color: #344054;
  }
}
</style>
