import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'

export const tableColumns: IColumn<IPosition>[] = [
  {
    id: 1,
    header: 'Position Name',
    field: 'name',
    sortable: true
  }
]
