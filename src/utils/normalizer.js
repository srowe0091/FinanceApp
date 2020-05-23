import dayjs from 'dayjs'
import replace from 'lodash/fp/replace'

export const formatDate = (date, format = 'M/D/YYYY') => dayjs(date).format(format)

export const pluralize = (count, string) => (1 === count ? string : `${string}s`)

export const calculateDays = dueDate => {
  const now = new Date()
  const nextPaymentDate =
    dayjs().date() <= dueDate ? dayjs().set('date', dueDate) : dayjs().set('date', dueDate).add(1, 'month')
  const difference = dayjs(nextPaymentDate).diff(now, 'day')

  if (difference === 15 || difference === 0) {
    return 'Submit Payment Today'
  }

  const _daysLeftCount = difference >= 15 ? difference - 15 : difference

  if (_daysLeftCount === 1) return 'Payment Due Tomorrow'
  return { count: _daysLeftCount, text: `${_daysLeftCount} days left` }
}

export const currency = number => `$${(number / 100).toFixed(2)}`

export const currenyFormat = value => {
  const number = parseInt(replace(/\D/g)('')(value), '10')
  return [currency(number), number]
}

export const hash = s => {
  let h = 0,
    l = s.length,
    i = 0
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return h
}
