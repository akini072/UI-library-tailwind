import moment from 'moment-timezone'

function rangeToTime(currentRange, startDate, endDate, minDate) {
  let ranges = {
    Today: [() => moment().startOf('day'), () => moment().endOf('day')],
    Yesterday: [
      () => moment().subtract(1, 'days').startOf('day'),
      () => moment().subtract(1, 'days').endOf('day'),
    ],
    'Last 7 days': [
      () => moment().subtract(6, 'days').startOf('day'),
      () => moment().endOf('day'),
    ],
    'Last 30 days': [
      () => moment().subtract(29, 'days').startOf('day'),
      () => moment().endOf('day'),
    ],
    'This month': [
      () => moment().startOf('month'),
      () => moment().endOf('month'),
    ],
    'Last month': [
      () => moment().subtract(1, 'month').startOf('month'),
      () => moment().subtract(1, 'month').endOf('month'),
    ],
    'Last 12 months': [
      () => moment().subtract(11, 'months').startOf('month'),
      () => moment().endOf('month'),
    ],
    'All time': [() => moment.utc(minDate), () => moment().endOf('day')],
  }

  for (const [key, value] of Object.entries(ranges)) {
    if (key === currentRange) {
      startDate = value[0]()
      endDate = value[1]()
      return { startDate, endDate }
    }
  }

  return { startDate, endDate }
}

export default {
  rangeToTime,
}
