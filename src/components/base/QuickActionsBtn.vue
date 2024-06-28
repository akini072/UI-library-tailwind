<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as="div">
        <v-button
          icon
          variant="text"
          size="medium"
          :color="color"
          :loading="loading"
          @click="$emit('is-active:dropdown', true)"
        >
          <v-tooltip :tooltip="content">
            <v-icon
              v-if="vertical"
              name="dots-vertical"
              height="18px"
              class="mr-2"
              color="var(--gray-400)"
            />
            <v-icon
              v-else
              name="ellipsis"
              width="18px"
              color="var(--gray-400)"
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
  },
  methods: {
    click(item, ev) {
      let action = item.label || item
      this.$emit('menuClick', { action, event: ev, ...item })
      this.$emit('itemClick', { action, event: ev, ...item })
    },
    handleTriggerTippy({ isVisible }) {
      this.$emit('is-active:tippy', isVisible)
    },
  },
}
</script>
