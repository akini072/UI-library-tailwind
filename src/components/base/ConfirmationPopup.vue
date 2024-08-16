<template>
  <v-popup width="560px" :title="title" @close="$emit('cancel')">
    <template v-slot:body>
      <div class="py-5 px-10 text--gray-500">
        {{ content }}
        <slot />
      </div>
    </template>
    <template v-slot:actions>
      <v-button
        :label="cancelButton"
        :disabled="loading"
        @click="$emit('cancel')"
      />
      <v-button
        color="red-light"
        :label="confirmButton"
        :loading="loading"
        @click="$emit('confirm')"
      />
    </template>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'ConfirmationPopup',
  components: {
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
  },
  props: {
    title: { type: String },
    content: { type: String },
    confirmButton: {
      type: String,
      default: 'Continue',
    },
    cancelButton: {
      type: String,
      default: 'Cancel',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
