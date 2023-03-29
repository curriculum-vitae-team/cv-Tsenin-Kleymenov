export interface IColumn<Row> {
  id: number
  header?: string
  field?: string
  render?: (item: Row) => React.ReactNode
}
