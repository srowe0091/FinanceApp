import dayjs from 'dayjs'
import cond from 'lodash/fp/cond'
import some from 'lodash/fp/some'
import isEqual from 'lodash/fp/isEqual'
import replace from 'lodash/fp/replace'
import isNumber from 'lodash/fp/isNumber'
import stubTrue from 'lodash/fp/stubTrue'

export const formatDate = (date, format = 'M/D/YYYY') => dayjs(date).format(format)

export const pluralize = (count, string) => (1 === count ? string : `${string}s`)

export const or =
  (...func) =>
  val =>
    some(f => f(val))(func)

export const toNumber = str => parseInt(replace(/\D/g)('')(str), '10')

const customConstant = text => daysLeft => ({ text, daysLeft })

const _determineDays = cond([
  [or(isEqual(15), isEqual(0)), customConstant('Submit Today')],
  [isEqual(1), customConstant('Due Tomorrow')],
  [stubTrue, v => customConstant(`${v} days left`)(v)]
])

export const calculateDays = dueDate => {
  const now = new Date()
  const nextPaymentDate =
    dayjs().date() <= dueDate ? dayjs().set('date', dueDate) : dayjs().set('date', dueDate).add(1, 'month')
  const difference = dayjs(nextPaymentDate).diff(now, 'day')

  return _determineDays(difference >= 15 ? difference - 15 : difference)
}

export const currency = number => (isNumber(number) ? `$${(number / 100).toFixed(2)}` : null)

export const currenyFormat = value => {
  const number = toNumber(value)
  return [currency(number, true), number]
}

export const hash = s => {
  let h = 0,
    l = s.length,
    i = 0
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
  return h
}
