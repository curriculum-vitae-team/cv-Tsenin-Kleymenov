import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'

export const tableColumns: IColumn<IProject>[] = [
  {
    id: 1,
    header: 'Name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'Internal Name',
    field: 'internal_name',
    sortable: true
  },
  {
    id: 3,
    header: 'Domain',
    field: 'domain',
    sortable: true
  },
  {
    id: 4,
    header: 'Start Date',
    field: 'start_date',
    sortable: true
  },
  {
    id: 5,
    header: 'End Date',
    field: 'end_date',
    sortable: true
  }
]
