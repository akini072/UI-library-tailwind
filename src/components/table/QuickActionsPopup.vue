<template>
  <div class="relative">
    <QuickActionsBtn
      vertical
      :items="dropdownItems"
      @menu-click="handleMenuClick"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    QuickActionsBtn: defineAsyncComponent(() =>
      import("../base/QuickActionsBtn.vue")
    ),
  },
  props: {
    value: {
      type: Object,
    },
    row: {
      type: Object
    }
  },
  computed: {
    dropdownItems() {
      return [
        {
          label: 'Fulfill',
          icon: 'fulfill',
          disabled: this.row.is_fulfilled || this.row.is_canceled
        },
        {
          label: 'Update tracking info',
          icon: 'truck',
          disabled: this.row.is_canceled || !this.row.is_fulfilled
        },
        {
          label: this.row.is_archived ? 'Unarchive' : 'Archive',
          icon: 'archive'
        },
        { label: 'Cancel order', disabled: this.row.is_canceled, icon: 'close-circle-outline' },
        { label: 'Refund', disabled:  this.row.is_canceled, icon: 'refund-2' },
        {
          label: 'Delete order',
          disabled: false,
          icon: 'trash'
        }
      ]
    }
  },
  methods: {
    handleMenuClick(evt) {
      this.$emit("click:item", {
        ...evt,
        selected: this.row,
      });
    },
  },
};
</script>
