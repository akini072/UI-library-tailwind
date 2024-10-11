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
      <div class="content" v-if="stepState === 2">
        <label class="form_steps_label step_1">
          <span class="icon"></span> Exporting ...
        </label>
        <div class="saving-process">
          <div class="prog-line">
            <div class="prog-line-inner" v-bind:style="{ width: progressNumber + '%' }"></div>
          </div>
          <span class="btm-info">Please wait while the process finishes...</span>
          <!-- <p>P.S. You can close this dialog and let the process to complete at the background</p> -->
        </div>
      </div>
      <div class="content" v-if="stepState === 3" style="align-items: center">
        <div class="form-group">
          <p style="font-size: 16px; font-weight: bold; margin: 0 0 10px">
            Your CSV is ready to download
          </p>
        </div>
        <a @click="downloadEvent()" class="btn">Download .CSV</a>
      </div>
    </template>
    <template v-slot:actions>
      <v-button color="primary" label="Export" @click="progressIncrement()" v-if="stepState === 1" />
      <v-button color="primary" label="Cancel" @click="$emit('close')" variant="outlined" />
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
    exporting: { type: Boolean, default: false },
    downloadRes: { default: null },
    exportData: { 
      default: {
        id: 0,
        funnel_id: 0
      }
    },
    funnel: {
      type: Object,
      default: {},
    }
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
    exportEvent() {
      this.exportCSV(false)
    },
    downloadEvent() {
      this.exportCSV(true)
    },
    nextStep(numberStep) {
      this.stepState = numberStep
      if (numberStep !== 1) {
        this.steps[numberStep - 2].status = 'completed'
      } else {
        this.steps[numberStep - 1].status = 'deactivated'
      }
      this.steps[numberStep - 1].status = 'active'
    },
    async progressIncrement() {
      this.exportEvent()
      this.nextStep(2)

      let progressIncrementInterval = setInterval(() => {
        if (this.progressNumber !== 100) {
          if (this.progressNumber > 95 && this.exporting) {
          } else this.progressNumber += 1
        } else {
          clearInterval(progressIncrementInterval)

          this.nextStep(3)
        }
      }, 10)
    },
    exportCSV(downloadType = false) {
      console.log('export', downloadType)
      if (this.funnel && parseInt(this.funnel.id) > 0) funnelId = parseInt(this.funnel.id)
      if (downloadType === false) {
        let startDate = moment(this.date.startDate).startOf('day').unix()
        let endDate = moment(this.date.endDate).endOf('day').unix()
        if (this.ordersBy === 'all') {
          startDate = 0
          endDate = 0
        }
        // What if it's 0, how BE will know which data to export?
        // Each parent component should have specific endpoint to communicate with?
        // Async actions will take place in the parent, and they will set the exporting prop!
        let data = {
          funnel_id: funnelId,
          time: null,
          data_size: null,
          file_name: null,
          done: false,
          failed: false,
          time_done: null,
          expiry_date: null,
          expired: false,
          downloads: null,
          params: JSON.stringify({
            exportType: this.ordersBy,
            rangeStart: startDate || 0,
            rangeEnd: endDate || 0
          })
        }
        // Original method
        // this.exportData = await this.dataListStore.exportData(data)
        this.$emit('get:export-data', data)
      } else {
        // Original method
        // var downloadRes = await this.dataListStore.download(this.exportData.id, funnelId)
        this.$emit('get:file', {exportDataId: this.exportData.id, funelId: funnelId})
        if (this.downloadRes) {
          let blob = new Blob([downloadRes], { type: 'text/csv;charset=utf-8' })
          saveAs(blob, 'orders-export.csv')
        }
        this.ordersByType = 'all'
      }
    }
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

  .content {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .saving-process {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      h5 {
        font-weight: 500;
        font-size: 15px;
        line-height: 150%;
        letter-spacing: 0.02em;
        color: #4368e0;
        margin-bottom: 20px;
      }

      .prog-line {
        display: block;
        position: relative;
        width: 100%;
        height: 10px;
        background: #d5e5ff;
        border-radius: 6px;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .prog-line-inner {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 10px;
        background: #15d7ae;
        border-radius: 6px;
      }

      .btm-info {
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.02em;
        color: #97aacd;
        margin-bottom: 20px;
      }

      p {
        margin: 0;
        font-weight: 500;
        font-size: 13px;
        line-height: 150%;
        letter-spacing: 0.02em;
        color: #636a7b;
      }
    }
  }
}
</style>