<template>
  <select-image-popup />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    SelectImagePopup: defineAsyncComponent(() =>
      import("@/components/images/SelectImagePopup.vue")
    ),
  },
};
</script>

<style lang="scss">
@import "@/assets/index.css";
@import "@/assets/styles/global.scss";
</style>
