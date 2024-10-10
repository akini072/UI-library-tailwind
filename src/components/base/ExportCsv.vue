<template>
  <v-popup width="560px" :title="title" @close="$emit('cancel')">
    <h5>Export</h5>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { saveAs } from 'file-saver'
import moment from 'moment'
export default {
  name: 'ExportCsv',
  components: {
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    RangeDatePicker: defineAsyncComponent(() => import('@/components/base/RangeDatePicker')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup')),
  },
  props: {
    title: { type: String },
    loadingExport: { type: Boolean },
  }
}
</script>

<style lang="scss" scoped>
</style>