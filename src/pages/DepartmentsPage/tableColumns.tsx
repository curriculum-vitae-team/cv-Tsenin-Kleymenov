import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'

export const tableColumns: IColumn<IDepartment>[] = [
  {
    id: 1,
    header: 'Department Name',
    field: 'name',
    sortable: true
  }
]
