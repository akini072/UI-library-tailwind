<template>
  <div class="date-picker__wrapper d-flex" :class="[size]">
    <vue-date-picker
      ref="datePicker"
      :model-value="modelValue"
      :enable-time-picker="false"
      :action-row="{
        showSelect: true,
        showCancel: false,
        showNow: false,
        showPreview: false,
      }"
      :clearable="false"
      :start-time="startTime"
      :max-date="maxDate"
      :min-date="minDate"
      :timezone="{ emitTimezone: timeZone }"
      :time-picker="isTimePicker"
      :minutes-increment="minutesIncrement"
      :hours-increment="hoursIncrement"
      :hours-grid-increment="hoursIncrement"
      :minutes-grid-increment="minutesIncrement"
      teleport
      auto-apply
      @update:model-value="handleUpdateDate"
    >
      <template #dp-input>
        <v-button class="picker__btn" :size="size">
          <v-icon
            v-if="isTimePicker"
            name="clock-outline"
            height="16px"
            color="var(--gray-600)"
          />
          <v-icon
            v-else
            name="calendar"
            height="14px"
            color="var(--gray-600)"
          />
          <h6 class="text--gray-700 ml-2">
            {{ formatDate(modelValue) }}
          </h6>
        </v-button>
      </template>
    </vue-date-picker>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment-timezone'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VueDatePicker: defineAsyncComponent(() => import('@vuepic/vue-datepicker')),
  },
  props: {
    modelValue: {
      type: [Date, Object],
      default: '',
    },
    minDate: {
      type: Date,
      default: new Date(),
    },
    maxDate: {
      type: Date,
      default: new Date(),
    },
    timeZone: {
      type: String,
      default: 'Europe/London',
    },
    size: {
      type: String,
      default: 'large',
    },
    isTimePicker: {
      type: Boolean,
      default: false,
    },
    minutesIncrement: {
      type: Number,
      default: 1,
    },
    hoursIncrement: {
      type: Number,
      default: 1,
    },
    startTime: {
      type: Object,
      default: {
        hours: 0,
        minutes: 0
      }
    }
  },
  methods: {
    formatDate(dateTime) {
      if (!dateTime) return ''
      let hoursLabel = `${dateTime.hours >= 10 ? dateTime.hours : '0' + dateTime.hours}`
      let minutesLabels = `${dateTime.minutes >= 10 ? dateTime.minutes : '0' + dateTime.minutes}`
      if (this.isTimePicker) return `${hoursLabel}:${minutesLabels}`
      return moment(dateTime).format('DD MMM yyyy')
    },
    handleUpdateDate(dateTime) {
      this.$emit('update:model-value', dateTime)
    },
  },
  mounted() {
    moment.tz.setDefault(this.timeZone || 'Europe/London')
  },
}
</script>
<style lang="scss">
.date-picker__wrapper {
  .picker__btn {
    justify-content: flex-start;
    .icon {
      svg {
        color: var(--gray-300);
      }
    }
  }
  .picker-icon__btn {
    display: none;
  }
  .dp__theme_light {
    --dp-primary-color: var(--primary-500);
    --dp-row-margin: 0px;
    --dp-font-family: var(--font-family);
    --dp-font-size: 12px;
    --dp-range-between-dates-background-color: var(--primary-25);
    --dp-hover-color: var(--primary-25);

    .dp__input {
      height: 32px;
    }
    .dp__input_icons {
      width: 14px;
      height: 14px;
      color: var(--gray-600);
    }
    .dp__calendar_header_item {
      font-size: 9px;
      font-weight: 400;
      color: var(--gray-400);
    }
    .dp__range_start {
      border-radius: 5px 0px 0px 5px;
    }
    .dp__date_hover:hover {
      border: 1px solid var(--primary-500);
    }
  }
}
@media (max-width: 760px) {
  .date-picker__wrapper {
    .range__btn,
    .picker__btn {
      display: none;
    }
    .picker-icon__btn {
      display: flex;
    }
  }
}
</style>
