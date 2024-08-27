<template>
  <div class="custom__select" ref="element">
    <label v-if="label" class="d-flex align-center custom-select__label">
      <span class="text-nowrap font-weight-medium">
        {{ label }}<sup class="required" v-if="required">*</sup>
      </span>
      <span class="font-weight-regular ml-2" v-if="optional">(optional)</span>
      <info-icon
        class="info__icon ml-2"
        :info="info"
        :info-icon-hover-effect="infoIconHoverEffect"
        v-if="!!info || !!$slots.info"
      >
        <slot name="info" />
      </info-icon>
    </label>
    <Multiselect
      ref="multiselect"
      :append-to-body="appendToBody"
      :style="{ width }"
      :class="{ [size]: true, disabled }"
      :classes="{
        dropdown: `multiselect-dropdown ${size} ${
          minDropdownWidth ? 'dropdown-min-width' : ''
        }`,
        singleLabel: `multiselect-single-label ${
          selectWidth < 100 ? 'no-label-padding' : ''
        }`,
      }"
      :value="modelValue || null"
      :options="options"
      :searchable="searchable"
      :label="labelKey"
      :loading="loading"
      :value-prop="valueKey"
      :can-clear="clearable"
      :create-option="allowCreate"
      :mode="mode"
      :placeholder="placeholder"
      :can-deselect="false"
      :disabled="disabled"
      @change="$emit('update:model-value', $event)"
      @click="toggleDropdown"
      @close="isOpen = false"
      @click.stop
    >
      <template v-slot:spinner>
        <div v-if="loading">
          <v-spinner class="__spinner" />
        </div>
      </template>
      <template v-slot:singlelabel="{ value }">
        <div v-if="$slots.singlelabel" class="multiselect-single-label">
          <slot name="singlelabel" :value="value" />
        </div>
      </template>
      <template v-slot:tag="{ option, handleTagRemove }">
        <slot
          v-if="$slots.tag"
          name="tag"
          :option="option"
          :handleTagRemove="handleTagRemove"
        />
      </template>
      <template v-slot:option="{ option }">
        <slot v-if="$slots.option" name="option" :option="option" />
      </template>
      <template v-slot:nooptions>
        <slot v-if="$slots.empty" name="empty" />
        <h6 v-else class="ma-2 mx-auto text-nowrap">
          Sorry, no matching options.
        </h6>
      </template>
      <template v-slot:noresults>
        <div class="pa-2">
          <h6 class="mx-auto text-nowrap">Sorry, no matching options.</h6>
        </div>
      </template>
      <template v-slot:caret="{ isOpen }">
        <v-icon
          class="arrow mr-2"
          height="14px"
          name="arrow-bottom"
          color="var(--gray-400)"
          :class="{ open: isOpen }"
          :style="{ 'pointer-events': isOpen ? 'none' : 'auto' }"
        />
      </template>
      <template v-slot:clear="{ clear }">
        <v-icon
          class="arrow mr-2"
          height="14px"
          name="close"
          color="var(--gray-400)"
          @mousedown="clear"
        />
      </template>
    </Multiselect>
  </div>
</template>

<script>
import { onMounted, ref, defineAsyncComponent } from 'vue'

export default {
  components: {
    Multiselect: defineAsyncComponent(() => import('@vueform/multiselect')),
    VSpinner: defineAsyncComponent(() =>
      import('@/components/base/VSpinner.vue'),
    ),
    InfoIcon: defineAsyncComponent(() => import('@/components/base/InfoIcon')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    minDropdownWidth: {
      type: Boolean,
      required: false,
    },
    modelValue: {
      type: [Number, String, Array, Object, Boolean],
    },
    info: {
      type: String,
      default: () => null,
    },
    size: {
      type: String,
      default: 'small',
    },
    width: {
      type: String,
    },
    mode: {
      type: String,
      default: 'single',
    },
    optional: { type: Boolean, default: false },
    options: {
      type: Array,
      default: () => [],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    placeholder: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    infoIconHoverEffect: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const element = ref(null)
    let selectWidth = ref(0)

    onMounted(() => {
      if (element.value) {
        selectWidth.value = element.value.clientWidth
      }
    })

    return {
      element,
      selectWidth,
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      if (!this.searchable) return
      this.isOpen = !this.isOpen
      if (this.isOpen) this.$refs.multiselect.open()
      else this.$refs.multiselect.close()
    },
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
:root {
  --ms-border-color: var(--gray-300);
  --ms-border-color-active: var(--primary-300);
  --ms-radius: 8px;
  --ms-ring-color: #c6d5f7;
  --ms-placeholder-color: var(--gray-400);
  --ms-spinner-color: var(--primary-500);
  --ms-tag-bg: var(--gray-200);
  --ms-tag-color: var(--gray-500);
  --ms-tag-font-weight: 500;
  --ms-dropdown-border-color: var(--gray-300);
  --ms-option-bg-selected: var(--primary-25);
  --ms-option-color-selected: var(--primary-500);
  --ms-option-bg-selected: var(--primary-25);
  --ms-option-bg-selected-pointed: var(--primary-25);
  --ms-option-color-selected-pointed: var(--primary-500);
}
.custom-select__label {
  margin-bottom: 6px;
  color: var(--gray-600);
  .required {
    color: var(--error-500);
  }
}

.multiselect {
  border-radius: 6px;

  &:not(.disabled):hover {
    border: 1px solid var(--primary-300);
  }

  &.disabled {
    opacity: 0.7;
  }

  &.large {
    min-height: 38px;
    font-size: 14px;
  }

  &.medium {
    min-height: 34px;
    font-size: 14px;
  }

  &.small {
    min-height: 28px;
    font-size: 12px;
  }
  .multiselect-wrapper {
    min-height: 100%;

    .multiselect-search:focus ~ .multiselect-single-label {
      opacity: 0.7;
    }

    .multiselect-multiple-label,
    .multiselect-placeholder,
    .multiselect-single-label {
      font-size: 14px;
      padding: 0 56px 0 8px;
    }
    .arrow {
      z-index: 1;
      &.open {
        transform: rotate(180deg);
      }
    }

    .__spinner {
      height: 18px;
      width: 18px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
.dropdown-min-width {
  min-width: 200px;
}
.no-label-padding {
  padding-right: 0px !important;
}
.multiselect-dropdown {
  z-index: 500;
  overflow-y: overlay !important;
  &.small {
    .multiselect-options {
      .multiselect-option {
        font-size: 12px;
      }
    }
  }
}
</style>
