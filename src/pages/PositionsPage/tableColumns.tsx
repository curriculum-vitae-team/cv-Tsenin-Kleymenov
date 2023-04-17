import { IColumn } from '@/appTypes/Column.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { PositionDropdown } from '@/pages/PositionsPage/PositionDropdown/PositionDropdown'

export const tableColumns: IColumn<IPosition>[] = [
  {
    id: 1,
    header: 'Position name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: '',
    render: item => <PositionDropdown position={item} />,
    sortable: false
  }
]
