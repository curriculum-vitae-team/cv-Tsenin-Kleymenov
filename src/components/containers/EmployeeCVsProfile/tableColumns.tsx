import { IColumn } from '@/appTypes/Column.interfaces'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { CVDropdown } from '@/pages/CVsPage/CVDropdown/CVDropdown'

export const tableColumns: IColumn<ICV>[] = [
  {
    id: 1,
    header: 'name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'description',
    field: 'description',
    sortable: false
  },
  {
    id: 3,
    header: '',
    render: CV => <CVDropdown CV={CV} />,
    sortable: false
  }
]
