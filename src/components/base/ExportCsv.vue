<template>
  <v-popup width="560px" :title="title" @close="$emit('close')" class="export-csv">
    <template #body>
      <div class="automation-progress-panel popup_progress_panel ma-4">
        <div class="item-prog d-flex" :class="{ deactivated: step.status === 'deactivated' }" v-for="step in steps"
          :key="step.id">
          <div class="icon-status mr-2" :class="{ active: step.status === 'active' }">
            <v-icon v-if="step.status === 'active' || step.status === 'deactivated'" name="circle-arrow-right" />
            <v-icon v-if="step.status === 'completed'" name="check-circle" />
            <v-icon v-if="step.status === 'error'" name="error" />
          </div>
          <div class="item-prog-text">
            <h5 :class="{
              'text--gray-500': step.status === 'active',
              'text--gray-300': step.status === 'deactivated'
            }">
              {{ step.status === 'error' ? 'Error' : step.name }}
            </h5>
          </div>
        </div>
      </div>
      <div class="col" v-if="stepState === 1">
        <div class="row d-flex">
          <label class="item switch_checkbox_item radio_box_item">
            <input type="radio" name="orders_by" value="by_date" v-model="ordersBy" />
            <div class="switch_checkbox" />
            By date
          </label>
          <div class="datapicker_wrpr" v-if="ordersBy === 'by_date'">
            <RangeDatePicker :range="date.currentRange" :modelValue="[date.startDate, date.endDate]"
              @update:model-value="handleDateUpdate" :minDate="minDate" size="medium" />
          </div>
        </div>
        <label class="item switch_checkbox_item radio_box_item">
          <input type="radio" name="orders_by" value="all" v-model="ordersBy" />
          <div class="switch_checkbox">
            <span></span>
          </div>
          All
        </label>
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
          name: 'Select items to export',
          step: 'Step1',
          status: 'active'
        },
        {
          id: 2,
          name: 'Exporting ...',
          step: 'Step2',
          status: 'deactivated'
        },
        {
          id: 3,
          name: 'Export completed',
          step: 'Step3',
          status: 'deactivated'
        }
      ],
      stepState: 1,
      ordersBy: 'all',
      progressNumber: 0
    }
  },
  computed: {
    minDate() {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 60);
      return currentDate;
    },
  },
  methods: {
    async handleDateUpdate(newDate) {
      await newDate;
      this.date = newDate
    },
  }
}
</script>

<style lang="scss" scoped>
.export-csv {
  z-index: 10;
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
      flex-wrap: nowrap;
      .item-prog-text {
        h5 {
          font-size: 14px;
        }
      }
    }
    .icon-status {
      color: var(--gray-300);

      &.active {
        color: var(--primary-500);
      }
    }
  }
  .item {
    display: flex;
    margin-bottom: 10px;
  }

  .col {
    margin: 0 34px;
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    .row {
      height: 38px;
    }
  }

  .switch_checkbox_item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .switch_checkbox_item input {
    // display: none;
    margin-right: 10px;
    margin-top: 2px;
    cursor: pointer;
  }

  .switch_checkbox_item input:checked~.switch_checkbox {
    background: var(--primary-500);
  }

  .datapicker_wrpr {
    margin-bottom: 10px;
    width: 260px;
    margin-left: 30px;
  }
}
</style>