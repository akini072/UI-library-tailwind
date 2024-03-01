<template>
  <fieldset
    :class="`${variant} ${isActive ? 'active' : ''}`"
    :style="{
      width,
      height,
      maxWidth,
      minWidth
    }"
  >
    <legend v-if="label" class="ml-3 d-flex align-center">
      <span class="mx-1 text-nowrap">
        {{ label }}
      </span>
      <span class="font-weight-light" v-if="optional">(optional)</span>
      <div
        v-if="!!info"
        class="info__icon mx-1"
        v-tippy="{ theme: 'light', placement: 'top' }"
        :content="info"
      >
        <v-icon name="info" height="16px" />
      </div>

      <tippy v-else-if="!!$slots.info">
        <template v-slot:trigger>
          <div class="info__icon">
            <v-icon name="info" height="18px" color="pink" />
          </div>
        </template>
        <slot name="info" />
      </tippy>
    </legend>
    <v-icon
      v-if="icon"
      class="ml-3 my-2"
      :name="icon"
      :height="iconSize"
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
    <el-select
      :model-value="modelValue"
      :value-key="valueKey"
      :placeholder="placeholder"
      @change="$emit('update:modelValue', $event)"
      @focus="isActive = true"
      @blur="isActive = false"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </fieldset>
</template>
<script>
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import VIcon from './VIcon.vue'
import { ElSelect, ElOption } from 'element-plus'


export default {
  name: 'VSelect',
  components: { VIcon, ElSelect, ElOption },
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
    class: {
      type: String
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
    iconSize: {
      type: String,
      required: false,
      default: '20px'
    },
    placeholder: {
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
    options: {
      type: Array
    },
    valueKey: {
      type: String
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
.el-select__wrapper {
  background-color: transparent;
  box-shadow: none;
  min-height: auto !important;
  &.is-hovering,
  &.is-focused {
    box-shadow: none !important;
  }
}
fieldset {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: var(--gray-200);
  border-radius: 8px;
  height: 41px;
  width: 100%;
  transition: 0.15s all ease-in-out;
  padding: 0;
  margin: 0;
  position: relative;

  &:not(.plain):hover {
    border: 2px solid var(--gray-300);
  }

  legend {
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    top: -12px;
    background-color: #fff;
    &,
    svg {
      color: var(--gray-300);
    }
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
}
</style>
