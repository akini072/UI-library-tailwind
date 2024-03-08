<template>
  <div :style="{'padding-top': label ? '6px' : '0'}">
    <fieldset
      :class="`v-field ${$props.size} ${variant} ${isActive ? 'active' : ''}`"
      :style="{
        width,
        height,
        maxWidth,
        minWidth
      }"
    >
      <legend v-if="label" class="ml-2 d-flex align-center">
        <span class="mx-1 text-nowrap">
          {{ label }}
        </span>
        <span class="font-weight-light mr-1" v-if="optional">(optional)</span>
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
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isActive = true"
        @blur="$emit('blur'), (isActive = false)"
      />
    </fieldset>
  </div>
</template>
<script>
import VIcon from './VIcon'
import InfoIcon from './InfoIcon'

export default {
  name: 'VField',
  components: { VIcon, InfoIcon },
  props: {
    label: {
      type: String
    },
    prepend: {
      type: String
    },

    info: {
      type: String,
      default: () => null
    },
    optional: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'plain'].includes(value)
      }
    },
    noInputPadding: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: () => null
    },
    iconColor: {
      type: String,
      required: false,
      default: 'var(--gray-300)'
    },
    placeholder: {
      type: String,
      required: false,
      default: () => null
    },
    autocomplete: {
      type: String,
      required: false,
      default: () => null
    },
    type: {
      type: String,
      required: false,
      default: () => null
    },
    modelValue: {
      type: [String, Number]
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    minWidth: {
      type: String
    },
    maxWidth: {
      type: String
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      isActive: false
    }
  }
}
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
  }

  legend {
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    top: -9px;
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
    border-color: var(--primary-500) !important;
    legend {
      color: var(--primary-500);
    }
  }

  &.small {
    height: 28px;
    input {
      font-size: 12px;
      padding: 0px 8px;
    }
    .prepend__icon {
      height: 15px;
    }
  }

  &.medium {
    height: 34px;
    input {
      font-size: 12px;
    }
  }
}
</style>
