<template>
  <div :style="{ 'padding-top': label ? '6px' : '0' }">
    <fieldset
      :class="{
        'v-select': true,
        loading,
        [variant]: !!variant,
        [$props.size]: !!$props.size,
        active: isActive
      }"
      :style="{
        width,
        height,
        maxWidth,
        minWidth
      }"
    >
      <div v-if="loading">
        <v-spinner />
      </div>
      <legend v-if="label" class="ml-2 d-flex align-center">
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
      <div v-if="prepend" style="height: 100%">
        <span>
          {{ prepend }}
        </span>
      </div>
      <div class="d-flex flex-grow align-center" style="height: 100%;">
        <el-select
          :model-value="modelValue"
          :value-key="valueKey"
          :filterable="filterable"
          :multiple="multiple"
          :size="size"
          :allow-create="allowCreate"
          :reserve-keyword="reserveKeyword"
          :default-first-option="allowCreate"
          :clearable="clearable"
          :placeholder="placeholder"
          @change="$emit('update:modelValue', $event)"
          @focus="isActive = true"
          @blur="isActive = false"
        >
          <template v-slot:empty>
            <slot name="empty"/>
          </template>
          <el-option
            v-for="(item, index) in options"
            style="height: auto"
            :key="index"
            :label="isObjectValue ? item[labelKey] : item"
            :value="isObjectValue ? item[valueKey] : item"
          >
            <div v-if="!!$slots.option" class="py-1">
              <slot
                name="option"
                :option="item"  
                :label="isObjectValue ? item[labelKey] : item"
                :value="isObjectValue ? item[valueKey] : item"
                :index="index"
              />
            </div>
            <span v-else> {{ item[labelKey] || item }} </span>
          </el-option>
        </el-select>
      </div>
    </fieldset>
  </div>
</template>
<script>
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import VIcon from './VIcon.vue'
import { ElSelect, ElOption } from 'element-plus'
import VSpinner from './VSpinner'

export default {
  name: 'VSelect',
  components: { VIcon, ElSelect, ElOption, VSpinner },
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
    iconSize: {
      type: String,
      required: false,
      default: '20px'
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: [String, Number, Array]
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
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    size: {
      type: String,
      default: 'default'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    reserveKeyword: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    isObjectValue() {
      return typeof this.options[0] === 'object'
    }
  }
}
</script>

<style lang="scss">
.el-select__wrapper {
  background-color: transparent;
  box-shadow: none!important;
  &.is-hovering,
  &.is-focused {
    box-shadow: none !important;
  }
}
.v-select {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 2px;
  border-color: var(--gray-200);
  border-radius: 8px;
  min-height: 41px;
  height: 100%;
  width: 100%;
  transition: 0.15s all ease-in-out;
  position: relative;
  margin: 0;
  padding: 0;

  &.loading {
    .spinner {
      height: 18px;
      width: 18px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
    .el-select {
      opacity: 0.2;
      pointer-events: none;
    }
  }
  &:not(.plain):not(.active):hover {
    border: 2px solid var(--gray-300);
  }

  &.small {
    min-height: 28px;
    .prepend__icon {
      height: 15px;
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

  input {
    padding: 0;
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
