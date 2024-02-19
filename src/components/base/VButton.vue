<template>
  <button
    :class="{
      block: block,
      disabled: disabled || loading,
      icon: icon,
      [colorClass]: true,
      [variantClass]: true,
    }"
    :style="{
      width,
      height
    }"
  >
    <div v-if="loading">
      <v-spinner />
    </div>
    <slot v-else />
  </button>
</template>

<script>
import VSpinner from "./VSpinner"

export default {
  components: {
    VSpinner
  },
  props: {
    color: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "36px"
    },
    icon: {
      type: Boolean,
      default: false,
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
        return ["outlined", "text", "default", "plain"].includes(value)
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
      return `color--${this.color}`
    },
    variantClass() {
      return this.variant
    }
  }
}
</script>
<style>
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
  border: 1px solid #D0D5DD;
  color: var(--gray-700);
  height: 36px;
  min-width: fit-content;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: all 400ms ease;

  &:not(.disabled):not(.outlined):hover {
    background: var(--gray-100);
  }
  &.color--primary {
    border: 0px;
    background-color: var(--primary-500);
    color: #fff;
    &:not(.disabled):not(.text):hover {
      background: #3A55D6;
    }
  
    svg path {
      stroke:#fff;
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
  &.outlined {
    border: 1px solid;
    border-color: inherit;
    background-color: transparent;
  }
  &.plain {
    border: 0px;
    background: var(--gray-100);
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
    border-color: transparent;
    color: var(--gray-500);
    background-color: var(--gray-200);
    cursor: auto;
    pointer-events: none;
  }
}

</style>