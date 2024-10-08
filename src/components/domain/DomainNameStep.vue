<template>
  <div>
    <v-field
      :model-value="domainName"
      class="mb-2"
      label="Domain name"
      placeholder="mydomain.com"
      @update:model-value="$emit('update:domain-name', $event)"
    />
    <div v-if="errorMessage" class="alert__box error mb-4">
      <div>
        <v-icon name="warning" height="28px" />
      </div>
      <span v-html="errorMessage" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VField: defineAsyncComponent(() => import('@/components/base/VField')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    domainName: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
