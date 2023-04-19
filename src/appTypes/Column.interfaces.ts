import { IBaseChildrenProps } from "./IBaseChildrenProps.interfaces"

export interface IColumn<Row> {
  id: number
  header?: string
  field?: string
  render?: (item: Row) => IBaseChildrenProps
  sortable: boolean
}
