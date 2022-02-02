export function getFirstDateOfMonth(date = new Date()) {
  date.setDate(1)

  return new Intl.DateTimeFormat('en-US').format(date)
}
