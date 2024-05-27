<template>
  <div
    v-if="!!info"
    class="info-icon__wrapper"
    :class="{ warn, small, '--hover-effect': infoIconHoverEffect }"
    :content="info"
    v-tippy="{ theme }"
  >
    <v-icon :name="iconName" :color="iconColor" height="16px" />
  </div>
  <tippy
    v-else-if="!!$slots"
    interactive
    :animate-fill="false"
    :placement="placement"
    theme="light-padding"
    animation="fade"
  >
    <template #default>
      <div
        class="d-flex align-center info-icon__wrapper"
        :class="{
          warn,
          small,
          '--hover-effect': infoIconHoverEffect,
        }"
      >
        <v-icon :name="iconName" :color="iconColor" height="16px" />
      </div>
    </template>
    <template #content>
      <slot />
    </template>
  </tippy>
</template>

<script>
import VIcon from './VIcon.vue'

export default {
  name: 'InfoIcon',
  components: { VIcon },
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
    interactive: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      default: () => null,
    },
    placement: {
      type: String,
      default: 'bottom-start',
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
    width: 18px;
    height: 18px;
  }
}
.tippy-content {
  width: max-content;
  max-width: 330px;
}
</style>
