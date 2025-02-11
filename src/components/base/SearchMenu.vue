<template>
  <div class="search__menu flex-grow d-flex">
    <v-field
      ref="search"
      :model-value="modelValue"
      class="search__input flex-grow mr-3"
      :class="{ active: !!modelValue }"
      variant="plain"
      placeholder="Search"
      @update:model-value="onChange"
    >
      <template v-slot:prepend>
        <div v-if="loading" class="search__loading">
          <v-spinner size="16px" />
        </div>
        <v-icon v-else name="search" height="14px" color="var(--gray-500)" />
      </template>
    </v-field>
    <v-button v-if="modelValue" label="Cancel" @click="() => onChange('')" />
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    VSpinner: defineAsyncComponent(() => import('./VSpinner.vue')),
    VField: defineAsyncComponent(() => import('./VField')),
    VButton: defineAsyncComponent(() => import('./VButton')),
    VIcon: defineAsyncComponent(() => import('./VIcon')),
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
    },
  },
  setup() {
  },
  methods: {
    onChange(value) {
      this.$emit('update:model-value', value);
    },
    focusInput() {
      this.$refs.search.$refs.input.focus()
    },
  },
  mounted() {
    this.$emit('search-menu:mounted')
  },
};
</script>
<style lang="scss" scoped>
.search__loading {
  position: relative;
  width: 14px;
}
</style>
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
      color: var(--primary-500);

      input {
        border-radius: 38px;
      }
    }
  }
}
</style>
