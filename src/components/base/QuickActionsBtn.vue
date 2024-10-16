<template>
  <div @click.stop>
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger as="div">
        <v-button
          icon
          :size="buttonSize"
          :variant="buttonVariant"
          :color="color"
          :loading="loading"
        >
          <v-tooltip :tooltip="content">
            <v-icon
              v-if="vertical"
              name="dots-vertical"
              height="18px"
              :color="buttonIconColor"
            />
            <v-icon
              v-else
              name="ellipsis"
              width="18px"
              :color="buttonIconColor"
            />
          </v-tooltip>
        </v-button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="text--gray-500 min-w-[150px]">
        <template v-for="(item, index) in items" :key="index">
          <DropdownMenuSeparator v-if="item === ''" />
          <DropdownMenuItem
            v-else
            :active="item.active || false"
            :disabled="item.disabled || false"
            @click.stop="click(item, $event)"
          >
            <v-icon
              v-if="item.icon"
              class="mr-2"
              :name="item.icon"
              height="16px"
            />
            <span class="font-weight-regular">{{ item.label }}</span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'quick-actions-btn',
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VTooltip: defineAsyncComponent(() => import('@/components/base/VTooltip')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    DropdownMenu: defineAsyncComponent(() =>
      import('@/components/shadcn/dropdown-menu/DropdownMenu'),
    ),
    DropdownMenuTrigger: defineAsyncComponent(() =>
      import('@/components/shadcn/dropdown-menu/DropdownMenuTrigger'),
    ),
    DropdownMenuItem: defineAsyncComponent(() =>
      import('@/components/shadcn/dropdown-menu/DropdownMenuItem'),
    ),
    DropdownMenuContent: defineAsyncComponent(() =>
      import('@/components/shadcn/dropdown-menu/DropdownMenuContent'),
    ),
    DropdownMenuSeparator: defineAsyncComponent(() =>
      import('@/components/shadcn/dropdown-menu/DropdownMenuSeparator'),
    ),
  },
  emits: ['itemClick', 'menuClick', 'is-active:dropdown'],
  props: {
    content: {
      default: 'Quick actions',
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    noTooltip: {
      default: false,
      type: Boolean,
    },
    items: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    buttonVariant: {
      type: String,
      default: 'text'
    },
    buttonSize: {
      type: String,
      default: 'medium'
    },
    buttonIconColor: {
      type: String,
      default: 'var(--gray-400)'
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    isOpen() {
      this.$emit('is-active:dropdown', this.isOpen)
    }
  },
  methods: {
    click(item, ev) {
      let action = item.label || item
      this.$emit('menuClick', { action, event: ev, ...item })
      this.$emit('itemClick', { action, event: ev, ...item })
    },
  },
}
</script>
