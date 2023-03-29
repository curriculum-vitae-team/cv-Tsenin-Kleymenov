import { monthArray,weekDayArray } from '@/constants/date'

export const convertCreatedAtDate = (data: string | undefined): string => {
  const date = new Date(Number(data))
  const createdAtWeekDay = date.getDay()
  const createdAtMonthDay = date.getDate()
  const createdAtMonth = date.getMonth()
  const createdAtYear = date.getFullYear()
  const result = `${weekDayArray[createdAtWeekDay]} ${monthArray[createdAtMonth]} ${createdAtMonthDay} ${createdAtYear}`
  return result
}
