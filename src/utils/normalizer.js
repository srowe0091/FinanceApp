import dayjs from 'dayjs'

export const formatDate = (date, format = 'M/D/YYYY') => dayjs(date).format(format)

export const pluralize = (count, string) => 1 === count ? string : `${string}s`

export const determineDays = (dueDate = 1) => {
  const now = new Date()
  const nextPaymentDate = dayjs().date() <= dueDate ? dayjs().set('date', dueDate) : dayjs().set('date', dueDate).add(1, 'month')
  const difference = dayjs(nextPaymentDate).diff(now, 'day')
  
  if (difference === 15 || difference === 0) {
    return "Submit Payment Today"
  }

  const _daysLeft = difference >= 15 ? difference - 15 : difference
  return `${_daysLeft} ${pluralize(_daysLeft, "day")} left`
}