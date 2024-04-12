import { IColumn } from '@/appTypes/Column.interfaces'
import { ICVProject } from '@/graphql/interfaces/ICv.interfaces'

export const tableColumns: IColumn<ICVProject>[] = [
  {
    id: 1,
    header: 'name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'internalName',
    field: 'internal_name',
    sortable: true
  },
  {
    id: 3,
    header: 'domain',
    field: 'domain',
    sortable: true
  },
  {
    id: 4,
    header: 'startDate',
    field: 'start_date',
    sortable: true
  },
  {
    id: 5,
    header: 'endDate',
    field: 'end_date',
    sortable: true
  }
]
