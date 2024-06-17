<template>
  <div class="switch-container" :class="{ checked: isChecked }">
    <label
      class="switch"
      :class="{
        right,
        __loading: loading,
        disabled: disabled,
        'no-label': noLabel,
        'has-desc': hasDesc || !!description,
      }"
    >
      <input
        type="checkbox"
        :checked="isChecked"
        @change="updateInput"
        :class="{ 'is-invalid': hasError }"
        @blur=";(isActive = false), (wasActive = true)"
        @focus="isActive = true"
      />

      <v-spinner v-if="loading" />
      <div class="switch_checkbox">
        <span></span>
      </div>

      <template v-if="label">
        <span class="text_label">{{ label }}</span>
        <info-icon
          v-if="info || !!$slots.info"
          class="ml-1"
          :info-icon-hover-effect="infoIconHoverEffect"
        >
          <div class="py-2 px-1">
            <div v-if="info" v-html="info" />
            <slot v-else name="info" />
          </div>
        </info-icon>
      </template>
      <template v-else>
        <span class="text_label" v-if="!noLabel">
          <slot></slot>
        </span>
      </template>
    </label>
    <p v-if="hasDesc" class="description">
      <slot name="description"></slot>
    </p>
    <p v-else-if="!!description" class="description">
      {{ description }}
    </p>
    <p v-if="hasError" class="validation-message">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    VSpinner: defineAsyncComponent(() => import('@/components/base/VSpinner')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    InfoIcon: defineAsyncComponent(() => import('@/components/base/InfoIcon')),
  },
  inheritAttrs: false,
  name: 'VSwitch',
  data: function () {
    return {
      wasActive: false,
      isActive: false,
    }
  },
  props: {
    infoIconHoverEffect: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      default: () => null,
    },
    description: {
      type: String,
      default: () => null,
    },
    error: {
      default: () => null,
    },
    interactive: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    right: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    noLabel: {
      type: Boolean,
      default: () => false,
    },
    modelValue: { type: Boolean },
    label: { type: String, required: false },
    trueValue: { default: true },
    falseValue: { default: false },
  },

  computed: {
    hasDesc() {
      return !!this.$slots.description
    },
    hasError() {
      return !!this.error && this.wasActive
    },
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.trueValue)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    },
  },
  methods: {
    updateInput(event) {
      if (this.disabled) return // do nothing.

      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.modelValue)
        } else {
          newValue.splice(newValue.indexOf(this.modelValue), 1)
        }
        this.$emit('update:modelValue', newValue)
      } else {
        this.$emit(
          'update:modelValue',
          isChecked ? this.trueValue : this.falseValue,
        )
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.switch-container {
  padding: 5px 6px;
  border-radius: 5px;
  height: fit-content;
  .description {
    margin: 2px 0 0 calc(40px + 10px);
    line-height: 1.4;
  }
  &:hover {
    background: var(--gray-100);
  }
  .switch {
    &.__loading {
      opacity: 0.6;
      pointer-events: none;
      input:checked ~ .switch_checkbox {
        background: #d5dbf5;
      }
    }
    &.right {
      flex-direction: row-reverse;
      .text_label {
        margin-left: 5px;
        margin-right: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.switch-container {
  display: block;
  position: relative;
  margin: 10px 0;
}
.switch {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  .text_label {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    display: block;
    margin-left: 10px;
  }
  &.has-desc {
    .text_label {
      font-weight: 500;
    }
    &:hover {
      .text_label {
        text-decoration: var(--gray-400) underline dashed 1px;
        text-underline-offset: 5px;
      }
    }
  }
  input {
    display: none;
  }

  .switch_checkbox {
    width: 36px;
    min-width: 36px;
    height: 20px;
    position: relative;
    background: var(--gray-300);
    border-radius: 12px;
    transition: 0.15s all ease-in-out;
    margin-right: 0;

    span {
      display: block;
      width: 16px;
      height: 16px;
      background: #ffffff;
      //box-shadow: 0px 1px 1px rgba(37, 42, 50, 0.03);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 3px;
      border-radius: 50%;
      transition: 0.15s all ease-in-out;
      filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.06))
        drop-shadow(0px 1px 3px rgba(16, 24, 40, 0.1));
    }
  }

  &.no-label {
    .switch_checkbox {
      margin-right: 0;
    }
  }
  &.disabled {
    pointer-events: none;
    input:checked ~ .switch_checkbox {
      background: #87a3ff;
    }
    input:not(:checked) ~ .switch_checkbox:hover {
      background: #e4e6f1;
    }
  }
  input:checked ~ .switch_checkbox {
    background: var(--primary-500);
  }

  input:not(:checked) ~ .switch_checkbox:hover {
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  }

  input:checked ~ .switch_checkbox span {
    right: 3px;
    left: auto;
    background: #fff;
  }
}
</style>
