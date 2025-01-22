<template>
  <div>
    <v-tooltip
      :theme="theme"
      :side="side"
      :align="info ? 'center' : align"
    >
      <div
        class="info-icon__wrapper"
        :class="{ warn, small, '--hover-effect': infoIconHoverEffect }"
      >
        <v-icon :name="iconName" :color="iconColor" />
      </div>
      <template #content>
        <div v-if="info" v-html="info" />
        <slot />
      </template>
    </v-tooltip>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'InfoIcon',
  components: {
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VTooltip: defineAsyncComponent(() => import('@/components/base/VTooltip')),
  },
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'light-padding',
    },
    warn: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      default: '',
    },
    side: {
      type: String,
      default: 'bottom',
    },
    align: {
      type: String,
      default: 'start',
    },
    iconColor: {
      type: String,
      default: 'var(--gray-300)',
    },
    hoverIconColor: {
      type: String,
      default: 'var(--primary-500)',
    },
    infoIconHoverEffect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconName() {
      return this.warn ? 'warning_icon' : 'help_icon'
    },
  },
}
</script>
<style lang="scss">
.info-icon__wrapper {
  cursor: pointer;

  &.--hover-effect {
    &:hover {
      svg {
        color: var(--primary-500);
      }
    }
    &.warn:hover {
      svg {
        color: var(--warning);
      }
    }
  }
  &.small {
    svg {
      width: 14px;
      height: 14px;
    }
  }
  svg {
    width: 16px;
    height: 16px;
  }
}
</style>
