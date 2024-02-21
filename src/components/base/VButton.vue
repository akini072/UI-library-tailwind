<template>
  <button
    :class="{
      block: block,
      disabled: disabled || loading,
      icon: icon,
      [colorClass]: true,
      [variantClass]: true
    }"
    :style="{
      width,
      height
    }"
  >
    <div v-if="loading" class="loading__spinner">
      <v-spinner />
    </div>
    <div class="d-flex align-center" :class="{ 'btn-content loading': loading }">
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else />
    </div>
  </button>
</template>

<script>
import VSpinner from './VSpinner.vue'

export default {
  components: {
    VSpinner
  },
  props: {
    label: {
      type: String,
    },
    color: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: '36px'
    },
    icon: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['outlined', 'text', 'default', 'plain', 'flat'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorClass() {
      if (this.color) return `color--${this.color}`
      return ''
    },
    variantClass() {
      return this.variant
    }
  }
}
</script>

<style lang="scss">
button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 14px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Roboto';
  letter-spacing: 0.28px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d0d5dd;
  color: var(--gray-700);
  height: 36px;
  min-width: fit-content;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: background-color 400ms ease;
  &:focus-visible {
    box-shadow:
      0px 0px 0px 4px #f4ebff,
      0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    outline: none;
  }
  &:hover {
    background: var(--gray-100);
  }
  &.color--primary {
    border: 0px;
    background-color: var(--primary-500);
    color: #fff;
    &:hover {
      border: 0px;
      background: var(--primary-700);
    }

    &.outlined {
      border: 1px solid var(--primary-500);
      color: var(--primary-500);
      &:hover {
        background-color: var(--primary-50);
      }
    }

    svg path {
      stroke: #fff;
    }

    &.text {
      color: var(--primary-500);
      svg path {
        fill: var(--primary-500);
      }
    }
  }
  &.color--white {
    border-color: white;
    color: white;
  }
  &.color--red {
    border: 0px;
    color: #fff;
    background-color: var(--error-500);
    &:hover {
      border: 0px;
      background-color: var(--error-600);
    }
    &.outlined {
      border: 1px solid var(--error-500);
      color: var(--error-500);
      &:hover {
        background-color: var(--error-50);
      }
    }
    &.text {
      color: var(--error-500);
      &:hover {
        background-color: var(--error-50);
      }
    }
  }
  &.outlined {
    border: 1px solid;
    border-color: inherit;
    background-color: transparent;
  }
  &.plain {
    border: 0px;
    background: var(--gray-100);
  }

  &.flat {
    padding: 0px;
    border: 0;
    background-color: transparent;
    box-shadow: none;
    &:hover {
      background: var(--gray-100);
      border: none;
    }
  }
  &.text {
    border: 0px;
    background-color: transparent;
    box-shadow: none;
    &:not(.disabled):hover {
      border: 0px;
    }
  }

  &.icon {
    border-radius: 100%;
    width: 36px;
    height: 36px;
    padding: 0px;
    .small {
      width: 32px;
      height: 32px;
    }
  }

  &.block {
    width: 100%;
  }

  &.disabled {
    opacity: 0.6;
    border-color: transparent !important;
    color: var(--gray-500);
    background-color: var(--gray-200);
    cursor: auto;
    pointer-events: none;
  }
  .btn-content.loading {
    opacity: 0;
  }
  .loading__spinner {
    position: absolute;
  }
}
</style>