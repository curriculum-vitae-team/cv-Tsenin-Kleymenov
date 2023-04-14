import dayjs from 'dayjs'

import { DATE_FORMAT } from '@/constants/dateFormats'

export const convertDate = (data: string): string | null => {
  if (data) {
    return dayjs(data).format(DATE_FORMAT.graphql)
  }
  return null
}
