<template>
  <div
    class="quick-actions-btn d-flex align-center"
    @click.stop
    @click.prevent
    :class="{ disabled }"
  >
    <tippy
      :ref="'quick_action_btn_tippy_' + id"
      interactive
      :animate-fill="false"
      placement="bottom-end"
      distant="7"
      theme="light"
      animation="fade"
      trigger="click"
      @state="handleTriggerTippy"
    >
      <template #default>
        <v-button
          v-tippy
          icon
          variant="text"
          size="medium"
          :color="color"
          :content="!noTooltip ? content : null"
          :loading="loading"
        >
          <v-icon
            v-if="vertical"
            name="dots-vertical"
            height="18px"
            class="mr-2"
            color="var(--gray-400)"
          />
          <v-icon v-else name="ellipsis" width="18px" color="var(--gray-400)" />
        </v-button>
      </template>
      <template #content>
        <div class="menu-items py-1">
          <menu-item
            v-for="(item, index) in items"
            :label="item.label || item"
            :icon="item.icon || ''"
            :active="item.active || false"
            :disabled="item.disabled || false"
            :key="'menu_item_' + index"
            @click.stop="click(item, $event)"
          />
        </div>
      </template>
    </tippy>
  </div>
</template>

<script>
import MenuItem from '@/components/base/MenuItem.vue'
import VButton from '@/components/base/VButton.vue'
import VIcon from '@/components/base/VIcon.vue'

let id = 0
export default {
  name: 'quick-actions-btn',
  components: { MenuItem, VButton, VIcon },
  props: {
    content: {
      default: 'Quick actions'
    },
    disabled: {
      default: false,
      type: Boolean
    },
    noTooltip: {
      default: false,
      type: Boolean
    },
    items: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: id++
    }
  },
  methods: {
    click(item, ev) {
      let action = item.label || item
      let tippy = this.$refs[`quick_action_btn_tippy_${this.id}`]
      tippy.hide()
      this.$emit('menuClick', { action, event: ev, ...item })
      this.$emit('itemClick', { action, event: ev, ...item })
    },
    handleTriggerTippy({ isVisible }) {
      this.$emit('is-active:tippy', isVisible)
    }
  }
}
</script>

<style lang="scss">
.disabled {
  pointer-events: none;
}

.menu-items {
  min-width: 150px;
}
</style>
