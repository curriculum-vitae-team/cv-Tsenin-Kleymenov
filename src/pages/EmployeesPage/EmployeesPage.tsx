import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { IUsersResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { EmployeeCreateModal } from '@/pages/EmployeesPage/EmployeeCreateModal/EmployeeCreateModal'

import { tableColumns } from './tableColumns'

export const EmployeesPage: FC = () => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()

  const { data, loading, error } = useQuery<IUsersResult>(GET_EMPLOYEES)

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.users
        : data?.users.filter(employee =>
            employee.profile.full_name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.users, deferredValue]
  )

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: ' space-between' }}>
        <InputWithIcon
          icon={<SearchIcon fontSize="small" />}
          position="start"
          size="small"
          value={searchedName}
          onChange={handleSearchUser}
          placeholder="Search"
        />
        {isAdmin && (
          <Button sx={{ maxWidth: 100 }} variant="contained" onClick={toggleVisibility}>
            Create
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <CommonTable<IUser>
        label="employees"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <EmployeeCreateModal onClose={toggleVisibility} />}
    </>
  )
}
