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
    <div
      class="d-flex align-center"
      :class="{ 'btn-content loading': loading }"
    >
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else />
    </div>
  </button>
</template>

<script>
import VSpinner from "./VSpinner.vue"

export default {
  components: {
    VSpinner
  },
  props: {
    label: {
      type: String
    },
    color: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: "36px"
    },
    icon: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    block: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "default",
      validator: function (value) {
        return ["outlined", "text", "default", "plain", "flat"].includes(value)
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
      return ""
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
  font-family: "Roboto";
  letter-spacing: 0.28px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #d0d5dd;
  color: var(--gray-700);
  height: 36px;
  min-width: fit-content;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: background-color 400ms ease;

  &.plain {
    background-color: var(--gray-100);
    border: none;
    box-shadow: none;
    &:hover {
      color: #1d2939;
    }
  }

  &.text {
    border: none;
    background-color: transparent;
    box-shadow: none;
    &:hover {
      background-color: var(--gray-100);
    }
  }

  &.block {
    width: 100%;
  }

  &:focus-visible {
    box-shadow: 0px 0px 0px 4px #f4ebff, 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    outline: none;
  }
  &:hover {
    background: var(--gray-100);
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

  &.disabled {
    opacity: 0.6;
    border-color: transparent !important;
    color: var(--gray-500)!important;
    background-color: var(--gray-200)!important;
    cursor: auto;
    pointer-events: none;
  }
  .btn-content.loading {
    opacity: 0;
  }
  .loading__spinner {
    position: absolute;
  }

  &.color--primary {
    border: 0px;
    background-color: var(--primary-500);
    color: #fff;
    svg path {
      stroke: #fff;
    }
    &:hover {
      border: 0px;
      background: var(--primary-700);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--primary-500);
      color: var(--primary-500);
      &:hover {
        background-color: var(--primary-25);
      }
    }

    &.text {
      border: none;
      background-color: transparent;
      box-shadow: none;
      svg path {
        fill: var(--primary-500);
      }
      &:hover {
        background-color: var(--primary-25);
      }
    }

    &.plain {
      background-color: var(--primary-25);
      border: none;
      box-shadow: none;
      color: var(--primary-500);
      &:hover {
        color: var(--primary-700);
      }
    }
  }
  &.color--red {
    border: 0px;
    background-color: var(--error-500);
    color: #fff;
    svg path {
      stroke: #fff;
    }
    &:hover {
      border: 0px;
      background: var(--error-700);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--error-500);
      color: var(--error-500);
      &:hover {
        background-color: var(--error-50);
      }
    }

    &.text {
      border: none;
      background-color: transparent;
      box-shadow: none;
      svg path {
        fill: var(--error-500);
      }
      &:hover {
        background-color: var(--error-50);
      }
    }

    &.plain {
      background-color: var(--error-50);
      border: none;
      box-shadow: none;
      color: var(--error-500);
      &:hover {
        color: var(--error-700);
      }
    }
  }
  &.color--white {
    border: 0px;
    background-color: #fff;
    color: var(--gray-700);
    svg path {
      stroke: var(--gray-700);
    }
    &:hover {
      border: 0px;
      background: var(--gray-100);
    }

    &.outlined {
      background-color: transparent;
      border: 1px solid #fff;
      color: #fff;
      &:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
