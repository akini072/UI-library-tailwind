<template>
  <div class="d-flex align-center">
    <popover>
      <popover-trigger as="div">
        <v-button variant="outlined" class="border-dashed" height="36px">
          <v-icon
            name="close-circle-outline"
            height="16px"
            class="mr-2"
            color="var(--gray-500)"
            @click="handleClearFilter"
          />
          <span>{{ label }}</span>
          <div v-if="isActive" class="border-l pl-2 ml-2">
            <span class="mx-1 px-2 py-1 bg--gray-100 rounded-md">
              {{ formattedDate }}
            </span>
          </div>
        </v-button>
      </popover-trigger>
      <popover-content class="p-0 w-[auto]" align="start">
        <div class="d-flex align-center px-3 py-2 w-full">
          <range-date-picker
            size="medium"
            :model-value="[startDate, endDate]"
            :range="currentRange"
            :min-date="minDate"
            :max-date="new Date()"
            :teleport="false"
            @update:model-value="rangeChanged"
          />
        </div>
      </popover-content>
    </popover>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'SelectStatus',
  components: {
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    Popover: defineAsyncComponent(() =>
      import('@/components/shadcn/popover/Popover'),
    ),
    PopoverContent: defineAsyncComponent(() =>
      import('@/components/shadcn/popover/PopoverContent'),
    ),
    PopoverTrigger: defineAsyncComponent(() =>
      import('@/components/shadcn/popover/PopoverTrigger'),
    ),
    RangeDatePicker: defineAsyncComponent(() =>
      import('@/components/base/RangeDatePicker'),
    ),
  },
  props: {
    label: { type: String, default: 'Created date' },
    minDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selected'],
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      currentRange: 'Last 30 days',
    }
  },
  computed: {
    filterOptions() {
      return this.options.filter((option) =>
        option.value.toLowerCase().includes(this.searchValue.toLowerCase()),
      )
    },
    selected() {
      return this.options.filter(({ checked }) => checked)
    },
  },
  watch: {
    selected(value) {
      this.$emit('update:selected', value)
    },
  },
  computed: {
    formattedDate() {
      if (this.currentRange !== 'Custom') return this.currentRange

      let start = moment(this.startDate)
      if (start.isSame(moment(), 'year')) start = start.format('DD MMM')
      else start = start.format('DD MMM yyyy')

      let end = moment(this.endDate)
      if (end.isSame(moment(), 'year')) end = end.format('DD MMM')
      else end = end.format('DD MMM yyyy')

      return start + ' - ' + end
    },
  },
  methods: {
    rangeChanged({ currentRange, startDate, endDate }) {
      this.currentRange = currentRange
      this.startDate = startDate
      this.endDate = endDate
      this.$emit('update:date', { startDate, endDate })
    },
    handleClearFilter() {
      this.$emit('update:date', null)
    },
  },
}
</script>

<style lang="scss" scoped>
.border-dashed {
  border-style: dashed;
}
.text-sm {
  font-size: 12px;
}
</style>
