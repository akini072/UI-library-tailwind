<template>
  <div class="search__menu flex-grow d-flex">
    <v-field
      :model-value="modelValue"
      class="search__input flex-grow mr-3"
      :class="{ active: !!modelValue }"
      icon="search"
      icon-color="var(--gray-500)"
      icon-size="14px"
      variant="plain"
      placeholder="Search"
      @update:model-value="onChange"
    />
    <v-button v-if="modelValue" label="Cancel" @click="() => onChange('')" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    VField: defineAsyncComponent(() => import("./VField")),
    VButton: defineAsyncComponent(() => import("./VButton")),
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    onChange(value) {
      this.$emit("update:model-value", value);
    },
  },
};
</script>

<style lang="scss">
.search__menu {
  .search__input {
    max-width: 800px;
    min-width: 200px;
    .v-input__fieldset {
      input {
        font-size: 12px;
      }
      &:hover,
      &:hover input {
        transition: none;
        background-color: var(--gray-50);
      }
    }

    &.active .v-input__fieldset,
    .v-input__fieldset.active {
      outline: 1px solid var(--primary-500);
      border-radius: 38px;
      border: none;

      input {
        border-radius: 38px;
      }
    }
  }
}
</style>
