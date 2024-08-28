<template>
  <button
    :class="{
      'w-full': block,
      disabled: disabled || loading,
      icon: icon,
      [size]: true,
      [colorClass]: true,
      [variantClass]: true,
      link: isLink,
      'no-hover': noHover,
    }"
    :style="{
      width,
      height,
    }"
  >
    <div v-if="loading" class="loading__spinner">
      <v-spinner />
    </div>
    <template v-if="label">
      {{ label }}
    </template>
    <slot v-else />
  </button>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'VButton',
  components: {
    VSpinner: defineAsyncComponent(() => import('@/components/base/VSpinner.vue')),
  },
  props: {
    label: {
      type: String,
    },
    color: {
      type: String,
      default: null,
    },
    height: {
      type: String,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['outlined', 'text', 'default', 'plain', 'flat'].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    noHover: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'medium',
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorClass() {
      if (this.color) return `color--${this.color}`
      return ''
    },
    variantClass() {
      return this.variant
    },
  },
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
  font-weight: 500;
  font-family: var(--font-family);
  letter-spacing: 0.28px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid var(--gray-300);
  color: var(--gray-700);
  height: 32px;
  min-width: fit-content;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: background-color 400ms ease;
  position: relative;
  white-space: nowrap;
  &.small {
    border-radius: 6.567px;
    height: 25px;
    font-size: 12px;

    .spinner {
      height: 18px;
      width: 18px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
  &.medium {
    border-radius: 6.567px;
    height: 28px;
    font-size: 12px;
  }
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
    width: 32px;
    height: 32px;
    padding: 0px;
    &.medium {
      min-width: 28px;
      min-height: 28px;
      width: 28px;
      height: 28px;

      .loading__spinner {
        .spinner,
        svg {
          height: 22px;
          width: 22px;
        }
      }
    }
    &.small {
      min-width: 25px;
      min-height: 25px;
      width: 25px;
      height: 25px;
    }
  }
  .btn-content.loading {
    opacity: 0;
  }

  .loading__spinner {
    position: absolute;
    background: var(--gray-100);
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  &.color--primary {
    border: 0px;
    background-color: var(--primary-600);
    color: #fff;
    &:hover {
      border: 0px;
      background: var(--primary-700);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--primary-600);
      color: var(--primary-600);
      &:hover {
        background-color: var(--primary-50);
        color: var(--primary-600);
        svg {
          color: var(--primary-600);
        }
      }
    }

    &.text {
      border: none;
      background-color: transparent;
      box-shadow: none;
      color: var(--primary-600);
      &:hover {
        background-color: var(--primary-50);
        color: var(--primary-600);
        svg {
          color: var(--primary-600);
        }
      }
    }

    &.plain {
      background-color: var(--primary-25);
      border: none;
      box-shadow: none;
      color: var(--primary-600);
      &:hover {
        color: var(--primary-700);
      }
    }
  }
  &.color--success {
    border: 0px;
    background-color: var(--success-500);
    color: #fff;
    &:hover {
      border: 0px;
      background: var(--success-700);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--success-500);
      color: var(--success-500);
      &:hover {
        background-color: var(--success-50);
        color: var(--success-500);
        svg {
          color: var(--success-500);
        }
      }
    }

    &.text {
      border: none;
      background-color: transparent;
      box-shadow: none;
      color: var(--success-500);
      &:hover {
        background-color: var(--success-50);
        color: var(--success-500);
        svg {
          color: var(--success-500);
        }
      }
    }
  }
  &.color--red {
    border: 0px;
    background-color: var(--error-700);
    color: #fff;
    &:hover {
      border: 0px;
      background: var(--error-700);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--error-300);
      color: var(--error-700);
      &:hover {
        background-color: var(--error-25);
        color: var(--error-700);
        svg {
          color: var(--error-700);
        }
      }
    }

    &.text {
      border: none;
      background-color: transparent;
      box-shadow: none;
      color: var(--error-500);

      &:hover {
        background-color: var(--error-100);
        color: var(--error-500);
        svg {
          color: var(--error-500);
        }
      }
    }

    &.plain {
      background-color: var(--error-25);
      border: none;
      box-shadow: none;
      color: var(--error-700);
      &:hover {
        background-color: var(--error-25);
        color: var(--error-700);
        svg {
          color: var(--error-700);
        }
      }
    }
  }
  &.color--red-light {
    border: 0px;
    background-color: var(--error-600);
    color: #fff;
    &:hover {
      border: 0px;
      background: var(--error-600);
    }

    &.outlined {
      background-color: #fff;
      border: 1px solid var(--error-200);
      color: var(--error-600);
      &:hover {
        background-color: var(--error-25);
        color: var(--error-600);
        svg {
          color: var(--error-600);
        }
      }
    }
  }
  &.color--white {
    border: 0px;
    background-color: #fff;
    color: var(--gray-700);
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
  &.no-hover:hover {
    background-color: inherit;
  }
  &.link {
    padding: 0;
    border: none;
    box-shadow: none;
    color: var(--primary-600);
    .icon {
      margin-left: 0;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      text-decoration: underline;
      background: none;
      .icon {
        &.right {
          margin-left: 3px;
        }
      }
    }
  }
  &.disabled {
    cursor: auto;
    pointer-events: none;
    background-color: var(--gray-100) !important;
    color: var(--gray-400) !important;
    border-color: transparent !important;
  }
}
</style>
