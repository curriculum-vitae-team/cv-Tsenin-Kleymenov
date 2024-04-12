import { IColumn } from '@/appTypes/Column.interfaces'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { DepartmentDropdown } from '@/pages/DepartmentsPage/DepartmentDropdown/DepartmentDropdown'

export const tableColumns: IColumn<IDepartment>[] = [
  {
    id: 1,
    header: 'departmentName',
    field: 'name',
    sortable: true
  },
  {
    id: 3,
    header: '',
    render: item => <DepartmentDropdown department={item} />,
    sortable: false
  }
]
