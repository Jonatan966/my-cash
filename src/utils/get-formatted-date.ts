import dayjs from 'dayjs'

export function getFormattedDate(date: Date | dayjs.Dayjs) {
  return dayjs(date).format('YYYY-MM-DD')
}
