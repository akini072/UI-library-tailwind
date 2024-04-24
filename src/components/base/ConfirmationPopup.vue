<template>
  <v-popup width="500px" :title="title" @close="$emit('cancel')">
    <template v-slot:body>
      <div class="pa-5">
        {{ content }}
        <slot />
      </div>
    </template>
    <template v-slot:actions>
      <v-button
        class="mr-4"
        color="red"
        variant="outlined"
        :label="confirmButton"
        :loading="loading"
        @click="$emit('confirm')"
      />
      <v-button
        color="primary"
        :label="cancelButton"
        :disabled="loading"
        @click="$emit('cancel')"
      />
    </template>
  </v-popup>
</template>

<script>
import VButton from './VButton.vue';
import VPopup from './VPopup.vue'

export default {
  name: 'ConfirmationPopup',
  components: { VPopup, VButton },
  props: {
    title: { type: String },
    content: { type: String },
    confirmButton: {
      type: String,
      default: 'Continue'
    },
    cancelButton: {
      type: String,
      default: 'Cancel'
    },
    loading: {
      type: Boolean,
      default: false
    },
  }
}
</script>
