<template>
  <div class="relative">
    <QuickActionsBtn
      vertical
      :items="actions"
      @menuClick="handleMenuClick"
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
    rowActions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    actions() {
      return this.rowActions.map((item) => {
        if (item.id === "fulfill")
          return { ...item, disabled: this.value.is_fulfilled || this.value.is_canceled };
        if (item.id === "truck")
          return { ...item, disabled: this.value.is_canceled || !this.value.is_fulfilled };
        if (item.id === "cancel")
          return { ...item, disabled: this.value.is_canceled };
        if (item.id === "refund")
          return { ...item, disabled: this.value.is_canceled || this.value.payment_status == "draft" || this.value.payment_status == "succeeded" };
        return item;
      });
    },
  },
  methods: {
    handleMenuClick(evt) {
      this.$emit("click", {
        ...evt,
        selected: this.value,
      });
    },
  },
};
</script>
