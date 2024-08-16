<template>
  <div>
    <div class="ma-5">
      <v-field
        v-model="domain"
        class="mb-7"
        label="Domain name"
        placeholder="mydomain.com"
      />
      <div v-if="errorMessage" class="alert__box error mb-4">
        <div>
          <v-icon name="warning" height="28px" />
        </div>
        <span v-html="errorMessage" />
      </div>
    </div>
    <div class="d-flex border-t justify-space-between py-3 px-5">
      <v-button
        label="Cancel"
        :disabled="loading"
        @click="$emit('cancel')"
      />
      <v-button
        class="ml-3"
        label="Connect"
        color="primary"
        :disabled="!domain"
        :loading="loading"
        @click="$emit('validate:domain', domain)"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VField: defineAsyncComponent(() => import('@/components/base/VField')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon'))
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
  watch: {
    domainName: {
      handler() {
        this.domain = this.domainName
      },
      immediate: true,
    },
  },
  data() {
    return {
      domain: '',
    }
  },
}
</script>
