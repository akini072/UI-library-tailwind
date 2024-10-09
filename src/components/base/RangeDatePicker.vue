<template>
  <div class="range-date-picker__wrapper d-flex">
    <DropdownMenu>
      <DropdownMenuTrigger
        class="range__btn"
        :class="{
          'h-[28px]': size === 'medium',
          'h-[36px]': size === 'large',
          [size]: true
        }"
      >
        <h6 class="text--gray-700 font-weight-bold text-nowrap">
          {{ selectedRange }}
        </h6>
        <v-icon
          class="ml-2"
          name="chevron-down"
          height="20px"
          color="var(--gray-600)"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="text--gray-500">
        <DropdownMenuItem
          v-for="(option, index) in rangeOptions"
          :key="index"
          @click="() => handleSelectRange(option)"
        >
          {{ option }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <vue-date-picker
      ref="datePicker"
      range
      :model-value="modelValue"
      :enable-time-picker="false"
      :action-row="{
        showSelect: true,
        showCancel: false,
        showNow: false,
        showPreview: false,
      }"
      :clearable="false"
      :max-date="maxDate"
      :min-date="minDate"
      :timezone="{ emitTimezone: timeZone }"
      :teleport="teleport"
      auto-apply
      @update:model-timezone-value="handleUpdateDate"
    >
      <template #dp-input>
        <v-button class="picker__btn" :size="size" block>
          <h6 class="text--gray-700 font-weight-bold">
            {{ formatDate(modelValue) }}
          </h6>
        </v-button>
        <v-button class="picker-icon__btn" :size="size" icon>
          <v-icon name="calendar" height="14px" color="var(--gray-600)" />
        </v-button>
      </template>
    </vue-date-picker>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import analytics from '@/helpers/analytics'
import moment from 'moment-timezone'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    MenuItem: defineAsyncComponent(() => import('@/components/base/MenuItem')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VueDatePicker: defineAsyncComponent(() => import('@vuepic/vue-datepicker')),
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
  },
  props: {
    range: {
      type: String,
    },
    modelValue: {
      type: Array[Date],
      default: () => ['', ''],
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
    teleport: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedRange: 'Last 30 days',
      rangeOptions: [
        'Today',
        'Yesterday',
        'Last 7 days',
        'Last 30 days',
        'This month',
        'Last month',
        'Last 12 months',
        'All time',
      ],
    }
  },
  watch: {
    range: {
      handler() {
        this.selectedRange = this.range
      },
      immediate: true,
    },
  },
  methods: {
    formatDate([startDate, endDate]) {
      let start = moment(startDate)
      if (start.isSame(moment(), 'year')) start = start.format('DD MMM')
      else start = start.format('DD MMM yyyy')

      let end = moment(endDate)
      if (end.isSame(moment(), 'year')) end = end.format('DD MMM')
      else end = end.format('DD MMM yyyy')

      return start + ' - ' + end
    },
    handleUpdateDate(dates, isCustom = true) {
      if (isCustom) this.selectedRange = 'Custom'
      this.$emit('update:model-value', {
        startDate: dates[0],
        endDate: dates[1],
        currentRange: this.selectedRange,
      })
    },
    handleSelectRange(value) {
      if (value === 'Custom') {
        this.handleUpdateDate(this.modelValue, true)
        return
      }

      this.selectedRange = value

      const { startDate, endDate } = analytics.rangeToTime(
        value,
        '',
        '',
        this.minDate,
      )
      this.handleUpdateDate([startDate, endDate], false)
    },
  },
  mounted() {
    moment.tz.setDefault(this.timeZone || 'Europe/London')
    this.handleSelectRange(this.range)
  },
}
</script>
<style lang="scss">
.range-date-picker__wrapper {
  .range__btn {
    font-size: 12px;
    border-radius: 8px 0px 0px 8px;
    border-right: none;
    padding: 0px 10px 0px 16px;

    &.medium {
      border-radius: 6.567px 0px 0px 6.567px;
    }
  }
  .picker__btn {
    font-size: 12px;
    border-radius: 0px 8px 8px 0px;

    &.medium {
      border-radius: 0px 6.567px 6.567px 0px;
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
