<template>
  <div>
    <label v-if="label" class="d-flex align-center text--gray-600">
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
    <fieldset
      class="v-input__fieldset"
      :class="{
        [$props.size]: true,
        [variant]: true,
        active: isActive,
        disabled,
        textarea,
      }"
      :style="{
        width,
        height,
        maxWidth,
        minWidth,
        margin: label ? '6px 0 0' : '0',
      }"
    >
      <v-icon
        v-if="icon"
        class="ml-3 mr-1 my-2"
        :name="icon"
        :height="iconSize"
        :width="iconSize"
        :color="isActive ? 'var(--primary-500)' : iconColor"
      />
      <div
        v-if="prepend || $slots.prepend"
        class="pl-3 d-flex align-center"
        style="height: 100%"
      >
        <div
          v-if="prepend"
          class="text--gray-300 pr-2 border-r d-flex align-center"
          style="height: 100%"
        >
          {{ prepend }}
        </div>
        <slot v-else name="prepend" />
      </div>
      <textarea
        v-if="textarea"
        ref="input"
        :class="{
          'px-3': !noInputPadding && !copyButton,
          'pl-3': copyButton,
          'has-max-length': !!maxLength,
        }"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxLength"
        @input="onInput"
        @focus="isActive = true"
        @blur="$emit('blur'), (isActive = false)"
        @dblclick="$refs.input.select"
      />
      <input
        v-else
        ref="input"
        :class="{
          'px-3': !noInputPadding && !copyButton,
          'pl-3': copyButton,
        }"
        :autocomplete="autocomplete"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        :step="step"
        :maxlength="maxLength"
        @input="onInput"
        @focus="$emit('focus'), (isActive = true)"
        @blur="$emit('blur'), (isActive = false)"
        @dblclick="$refs.input.select"
      />
      <div
        v-if="copyButton"
        class="border-l h-full pointer d-flex align-center px-2"
        ref="shareUrlCopyButton"
        @click="copyToClipboard(shareUrl)"
      >
        <v-tooltip v-model="showCopyTooltip" :tooltip="copyTooltip">
          <div class="d-flex align-center">
            <v-icon name="copy_link" height="16px" color="var(--gray-700)" />
            <h6 class="text--gray-700 font-weight-medium ml-1">
              {{ copyButtonText }}
            </h6>
          </div>
        </v-tooltip>
      </div>
      <slot v-if="!!$slots.append" name="append" />
      <div
        v-if="append"
        class="d-flex align-center text--gray-600 px-2"
        style="height: 100%"
      >
        <span>
          {{ append }}
        </span>
      </div>
      <span
        class="max-length"
        v-if="maxLength > 0"
        :class="{ error: length >= maxLength }"
      >
        {{ length }} / {{ maxLength }}
      </span>
    </fieldset>
    <h6 v-if="hint" class="__hint">
      {{ hint }}
    </h6>
  </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'VField',
  components: {
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    InfoIcon: defineAsyncComponent(() => import('@/components/base/InfoIcon')),
    VTooltip: defineAsyncComponent(() => import('@/components/base/VTooltip')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
  },
  props: {
    label: {
      type: String,
    },
    step: {
      type: Number,
    },
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    info: {
      type: String,
      default: '',
    },
    optional: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'plain'].includes(value)
      },
    },
    noInputPadding: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: () => null,
    },
    iconColor: {
      type: String,
      required: false,
      default: 'var(--gray-300)',
    },
    iconSize: {
      type: String,
      required: false,
      default: '20px',
    },
    placeholder: {
      type: String,
      required: false,
      default: () => null,
    },
    autocomplete: {
      type: String,
      required: false,
      default: () => null,
    },
    type: {
      type: String,
      required: false,
      default: () => null,
    },
    modelValue: {
      type: [String, Number],
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    minWidth: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
    size: {
      type: String,
      default: 'small',
    },
    hint: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: null,
    },
    copyButton: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    infoIconHoverEffect: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 1,
    },
    copyButtonText: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
    },
  },
  data() {
    return {
      isActive: false,
      copyTooltip: 'Copy',
      showCopyTooltip: false,
    }
  },
  computed: {
    length() {
      return (this.modelValue || '').length
    },
  },
  methods: {
    async copyToClipboard() {
      this.copyTooltip = 'Copied!'
      this.showCopyTooltip = true
      navigator.clipboard.writeText(this.modelValue)
      setTimeout(
        () => ((this.copyTooltip = 'Copy'), (this.showCopyTooltip = false)),
        1500,
      )
    },
    onInput($event) {
      this.$emit('update:modelValue', $event.target.value)
    },
  },
}
</script>

<style lang="scss">
.required {
  color: var(--error-500);
}
.v-input__fieldset {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 1px;
  border-color: var(--gray-300);
  border-radius: 6px;
  transition: 0.15s all ease-in-out;
  position: relative;
  padding: 0;
  height: 40px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  &.textarea {
    height: auto !important;
    overflow: hidden;

    textarea {
      flex: 1;
      height: auto;
      padding: 10px 12px;
      resize: vertical;

      &.has-max-length {
        resize: none;
      }
    }
  }

  &:not(.active):not(.plain):hover {
    border: 1px solid var(--primary-300);
  }

  input,
  textarea {
    font-size: 14px;
    border-radius: 6px;
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1;
    color: var(--gray-900);
    &::placeholder {
      color: var(--gray-400);
    }
  }

  &.plain {
    border: 0px;
    box-shadow: none;
  }

  &:not(.plain).active,
  &:focus {
    border: 1px solid var(--primary-300);
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #c6d5f7;
  }

  &.small {
    height: 28px;
    input {
      padding: 0px 8px;
    }
  }

  &.medium {
    height: 32px;
  }
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .max-length {
    border-radius: 5px 0 5px 0;
    border-top: 1px solid whitesmoke;
    border-left: 1px solid whitesmoke;
    border-right: none;
    padding: 0px 8px;
    font-size: 10px;
    margin-top: auto;
    color: var(--gray-400);
    &.error {
      color: var(--error-400);
    }
  }

  .info__icon {
    position: absolute;
    right: -20px;
    top: -3px;
    background: #fff;
    padding: 0px 4px;
  }
}

.__hint {
  color: var(--gray-600);
  margin-top: 4px;
}
</style>
