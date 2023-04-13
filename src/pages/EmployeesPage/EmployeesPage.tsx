import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { IUsersResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import useDebounce from '@/hooks/useDebounce'

import { tableColumns } from './tableColumns'

export const EmployeesPage: FC = () => {
  const { data, loading, error } = useQuery<IUsersResult>(GET_EMPLOYEES)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.users
        : data?.users.filter(user =>
            user.profile.full_name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.users, debouncedSearchTerm]
  )

  return (
    <>
      <InputWithIcon
        icon={<SearchIcon fontSize="small" />}
        position="start"
        size="small"
        style={{ marginBottom: '20px' }}
        value={searchedName}
        onChange={handleSearchUser}
        placeholder="Search"
      />
      <CommonTable<IUser>
        label="employees"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
