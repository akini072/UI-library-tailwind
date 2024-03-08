<template>
  <div
    v-if="!!info"
    class="info-icon"
    :class="{ warn, small }"
    :content="info"
    v-tippy="{ theme }"
  >
    <v-icon :name="iconName" :color="iconColor" />
  </div>
  <tippy
    v-else-if="!!$slots"
    interactive
    :animate-fill="false"
    :placement="placement"
    theme="light"
    animation="fade"
  >
    <template #default>
      <div class="info-icon" :class="{ warn, small }">
        <v-icon :name="iconName" :color="iconColor" />
      </div>
    </template>
    <template #content>
      <slot />
    </template>
  </tippy>
</template>

<script>
import VIcon from "./VIcon.vue"

export default {
  name: "InfoIcon",
  components: { VIcon },
  props: {
    small: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "white"
    },
    warn: {
      type: Boolean,
      default: false
    },
    interactive: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: () => null
    },
    placement: {
      type: String,
      default: "bottom-end"
    },
    iconColor: {
      type: String,
      default: "var(--gray-300)"
    }
  },
  computed: {
    iconName() {
      return this.warn ? "warning_icon" : "info"
    }
  }
}
</script>
<style lang="scss">
.info-icon {
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
