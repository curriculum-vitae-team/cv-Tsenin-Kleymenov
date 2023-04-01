import { MONTH_ARRAY, WEEK_DAY_ARRAY } from '@/constants/date'

export const convertCreatedAtDate = (data: string | undefined): string => {
  const date = new Date(Number(data))
  const createdAtWeekDay = date.getDay()
  const createdAtMonthDay = date.getDate()
  const createdAtMonth = date.getMonth()
  const createdAtYear = date.getFullYear()
  const result = `${WEEK_DAY_ARRAY[createdAtWeekDay]} ${MONTH_ARRAY[createdAtMonth]} ${createdAtMonthDay} ${createdAtYear}`
  return result
}
