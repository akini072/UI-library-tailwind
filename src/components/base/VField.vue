<template>
  <div :style="{ 'padding-top': label ? '6px' : '0' }">
    <fieldset
      :class="`v-field ${$props.size} ${variant} ${isActive ? 'active' : ''}`"
      :style="{
        width,
        height,
        maxWidth,
        minWidth,
      }"
    >
      <legend v-if="label" class="ml-2 d-flex align-center">
        <span class="mx-1 text-nowrap">
          {{ label }}
        </span>
        <span class="font-weight-regular mr-1" v-if="optional">(optional)</span>
        <info-icon v-if="$slots.info" :info="info" class="mr-1">
          <slot name="info" />
        </info-icon>
      </legend>
      <v-icon
        v-if="icon"
        class="ml-3 my-2 prepend__icon"
        :name="icon"
        :color="isActive ? 'var(--primary-500)' : iconColor"
      />
      <div
        v-if="prepend"
        class="border-r text--gray-300 px-2 d-flex align-center"
        style="height: 100%"
      >
        <span>
          {{ prepend }}
        </span>
      </div>
      <input
        :class="{ 'px-4': !noInputPadding }"
        :autocomplete="autocomplete"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        :step="step"
        :maxlength="maxLength"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isActive = true"
        @blur="$emit('blur'), (isActive = false)"
      />
      <div v-if="copyButton">
        <v-button
          v-tippy="{ hideOnClick: false, duration: [350, 400] }"
          ref="shareUrlCopyButton"
          :content="copyTooltip"
          class="mr-2"
          variant="text"
          size="medium"
          icon
          @click="copyToClipboard(shareUrl)"
        >
          <v-icon name="copy_link" height="16px" color="var(--gray-500)" />
        </v-button>
      </div>
      <slot v-if="!!$slots.append" name="append" />
      <div
        v-if="append"
        class="d-flex align-center text--gray-300 px-2"
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

      <h6 class="__hint">
        {{ hint }}
      </h6>
    </fieldset>
  </div>
</template>
<script>
import VIcon from "./VIcon";
import InfoIcon from "./InfoIcon";
import VButton from "./VButton.vue";

export default {
  name: "VField",
  components: { VIcon, InfoIcon, VButton },
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
      default: () => null,
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
      default: "default",
      validator: function (value) {
        return ["default", "plain"].includes(value);
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
      default: "var(--gray-300)",
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
      default: "default",
    },
    hint: {
      type: String,
      default: "",
    },
    maxLength: {
      type: Number,
      default: null,
    },
    copyButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
      copyTooltip: "Copy",
    };
  },
  computed: {
    length() {
      return (this.modelValue || "").length;
    },
  },
  methods: {
    async copyToClipboard() {
      this.copyTooltip = "Copied!";
      navigator.clipboard.writeText(this.modelValue);
      setTimeout(() => (this.copyTooltip = "Copy"), 1500);
    },
  },
};
</script>

<style lang="scss">
.v-field {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: var(--gray-200);
  border-radius: 8px;
  height: 41px;
  transition: 0.15s all ease-in-out;
  position: relative;
  padding: 0;
  margin: 0;

  &:not(.plain):hover {
    border: 2px solid var(--gray-300);
  }
  input {
    font-size: 14px;
    border-radius: 6px;
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1;
    color: var(--gray-500);
    &::placeholder {
      color: var(--gray-300);
    }
    &:focus + .__hint {
      opacity: 1;
      bottom: -22px;
    }
  }

  legend {
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    top: -7px;
    line-height: 12px;
    background-color: #fff;
    &,
    svg {
      color: var(--gray-300);
    }
  }
  .prepend__icon {
    height: 20px;
  }
  &.plain {
    border: 0px;
  }

  &.active {
    border-color: var(--primary-500);
    legend {
      color: var(--primary-500);
    }
  }

  &.small {
    height: 28px;
    legend {
      top: -9px;
    }
    input {
      font-size: 12px;
      padding: 0px 8px;
    }
    .prepend__icon {
      height: 12px;
      margin-left: 8px;
    }
  }

  &.medium {
    height: 34px;
    input {
      font-size: 12px;
    }
  }
  .__hint {
    color: var(--gray-400);
    position: absolute;
    bottom: -18px;
    margin-left: 6px;
    opacity: 0;
    transition: all 200ms ease;
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
}
</style>
