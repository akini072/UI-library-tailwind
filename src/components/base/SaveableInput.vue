<template>
  <fieldset
    :class="`saveable__fieldset ${$props.size} ${isActive ? 'active' : ''}`"
  >
    <input
      ref="saveableInput"
      :autocomplete="autocomplete"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput($event.target.value)"
      @keydown.enter="save"
      @focus="isActive = true"
      @blur="$emit('blur'), (isActive = false)"
    />
    <v-button
      variant="text"
      icon
      size="small"
      color="primary"
      :loading="loading"
      @click.stop="save"
    >
      <v-tooltip tooltip="Save changes">
        <v-icon name="check" width="14px" color="var(--gray-400)" />
      </v-tooltip>
    </v-button>
    <v-button
      class="ml-1 cancel__btn"
      variant="text"
      size="small"
      color="red"
      icon
      @click.stop="$emit('cancel')"
    >
      <v-tooltip tooltip="Cancel">
        <v-icon name="close-bold" width="16px" color="var(--gray-400)" />
      </v-tooltip>
    </v-button>
  </fieldset>
</template>

<script>
import { defineAsyncComponent } from 'vue'

let id = 1
export default {
  name: 'SaveableInput',
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VTooltip: defineAsyncComponent(() => import('@/components/base/VTooltip')),
  },
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { default: '' },
    isEdit: { default: false, type: Boolean },
    loading: { default: false, type: Boolean },
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
    size: {
      type: String,
      default: 'medium',
    },
  },
  data() {
    return {
      id: id++,
      isActive: false,
      hasError: false,
    }
  },
  methods: {
    onInput(ev) {
      if (this.loading) return
      this.hasError = false
      this.$emit('update:modelValue', ev)
    },
    onChange(ev) {
      this.hasError = false
      this.$emit('change', ev)
    },
    save() {
      if (!this.modelValue) {
        this.hasError = true
        return
      }
      this.$emit('save', this.modelValue)
    },
  },
  mounted() {
    this.$refs.saveableInput.focus()
  },
}
</script>

<style lang="scss" scoped>
.saveable__fieldset {
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-style: solid;
  border-width: 1px;
  border-color: var(--gray-300);
  border-radius: 8px;
  height: 41px;
  transition: 0.15s all ease-in-out;
  position: relative;
  padding: 0 8px 0 12px;
  margin: 0;

  &:hover {
    border-color: var(--primary-500);
  }

  input {
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
