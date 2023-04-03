import { EmployeesDropdown } from '@/components/containers/EmployeesDropdown/EmployeesDropdown'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export const tableColumns: IColumn<IUser>[] = [
  {
    id: 1,
    header: '',
    render: item => <UserAvatar user={item} />,
    sortable: false
  },
  {
    id: 2,
    header: 'First Name',
    field: 'profile.first_name',
    sortable: true
  },
  {
    id: 3,
    header: 'Last Name',
    field: 'profile.last_name',
    sortable: true
  },
  {
    id: 4,
    header: 'Email',
    field: 'email',
    sortable: true
  },
  {
    id: 5,
    header: 'Department',
    field: 'department_name',
    sortable: true
  },
  {
    id: 6,
    header: 'Position',
    field: 'position_name',
    sortable: true
  },
  {
    id: 7,
    header: '',
    render: item => <EmployeesDropdown item={item} />,
    sortable: false
  }
]
