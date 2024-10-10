<template>
  <v-popup width="560px" :title="title" @close="$emit('close')">
    <template #body>
      <div class="automation-progress-panel popup_progress_panel ma-4">
        <div class="item-prog d-flex" :class="{ deactivated: step.status === 'deactivated' }" v-for="step in steps"
          :key="step.id">
        </div>
      </div>
    </template>
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
  },
  data() {
    const startDate = moment().startOf('day').toDate()
    const endDate = moment().endOf('day').toDate()
    const date = {
      startDate,
      endDate,
      currentRange: 'Last 30 days'
    }
    return {
      date: date,
      exporting: false,
      exportData: {
        id: 0,
        funnel_id: 0
      },
      steps: [
        {
          id: 1,
          name: 'Select orders to export',
          step: 'Step1',
          status: 'active'
        },
        {
          id: 2,
          name: 'Exporting your orders...',
          step: 'Step2',
          status: 'deactivated'
        },
        {
          id: 3,
          name: 'Exporting completed',
          step: 'Step3',
          status: 'deactivated'
        }
      ],
      stepState: 1,
      ordersBy: 'all',
      progressNumber: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.automation-progress-panel {
  display: flex;
  justify-content: space-between;
  &.popup_progress_panel {
    flex-wrap: wrap;
    padding: 2px;
    margin-bottom: 20px;
  }
  .item-prog {
    margin: 5px;
  }
}
</style>