import dayjs from 'dayjs'

export const formatDate = (date, format = 'M/D/YYYY') => dayjs(date).format(format)