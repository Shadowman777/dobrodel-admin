import dayjs from 'dayjs'

export function formatDate(date: string) {
  return date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'
}
