<template>
  <div class="time-cell text-nowrap">
    {{ formattedDate }}
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  props: {
    row: {
      type: Object,
    },
    timeZone: {
      type: String,
      default: 'Europe/London'
    },
    dateField: {
      // <key of the date-time field that should be displayed>
      type: String,
    }
  },
  computed: {
    formattedDate() {
      const d = this.dateField ? new Date(this.row[this.dateField]).toISOString() : new Date(this.row.updated_at).toISOString()
      let x = moment.tz(d, this.timeZone)
      let diff = (new Date() - x) / 3600 / 1000
      return diff > 24 ? x.format('MMM D, LT') : moment(x).fromNow()
    },
  },
}
</script>

<style lang="scss" scoped>
.time-cell::first-letter {
  text-transform: uppercase;
}
</style>
