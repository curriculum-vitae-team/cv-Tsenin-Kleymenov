import { IColumn } from '@/appTypes/Column.interfaces'
import { UserAvatar } from '@/components/views/UserAvatar/UserAvatar'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'
import { EmployeeDropdown } from '@/pages/EmployeesPage/EmployeeDropdown/EmployeeDropdown'

export const tableColumns: IColumn<IUser>[] = [
  {
    id: 1,
    header: '',
    render: item => <UserAvatar user={item} />,
    sortable: false
  },
  {
    id: 2,
    header: 'firstName',
    field: 'profile.first_name',
    sortable: true
  },
  {
    id: 3,
    header: 'lastName',
    field: 'profile.last_name',
    sortable: true
  },
  {
    id: 4,
    header: 'email',
    field: 'email',
    sortable: true
  },
  {
    id: 5,
    header: 'department',
    field: 'department_name',
    sortable: true
  },
  {
    id: 6,
    header: 'position',
    field: 'position_name',
    sortable: true
  },
  {
    id: 7,
    header: '',
    render: employee => <EmployeeDropdown employee={employee} />,
    sortable: false
  }
]
