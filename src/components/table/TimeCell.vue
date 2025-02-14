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
    value: {
      type: String
    }
  },
  computed: {
    formattedDate() {
      let val
      if (this.value) {
        const d = new Date(this.value).toISOString()
        let x = moment.tz(d, this.timeZone)
        let diff = (new Date() - x) / 3600 / 1000
        val = diff > 24 ? x.format('MMM D, LT') : moment(x).fromNow()
      } else {
        val = '-'
      }
      
      return val
    },
  },
}
</script>

<style lang="scss" scoped>
.time-cell::first-letter {
  text-transform: uppercase;
}
</style>
