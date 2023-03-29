import { FC } from 'react'
import { useQuery } from '@apollo/client'

import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { IUsersResult } from '@/graphql/users/usersResult.interface'

import { tableColumns } from './tableColumns'

const EmployeesPage: FC = () => {
  const { data, loading, error } = useQuery<IUsersResult>(GET_EMPLOYEES)

  return (
    <CommonTable<IUser>
      label="employees"
      data={data?.users}
      tableColumns={tableColumns}
      isLoading={loading}
      error={error}
    />
  )
}

export default EmployeesPage
