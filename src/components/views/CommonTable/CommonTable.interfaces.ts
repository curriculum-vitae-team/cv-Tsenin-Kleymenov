import { ApolloError } from '@apollo/client'

import { IColumn } from '@/appTypes/Column.interfaces'

export interface ICommonTableProps<T> {
  label: string
  data?: T[]
  tableColumns: IColumn<T>[]
  isLoading: boolean
  error?: ApolloError
}
