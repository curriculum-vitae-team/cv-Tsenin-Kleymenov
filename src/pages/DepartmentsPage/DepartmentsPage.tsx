import { FC, useMemo, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { IDepartmentResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import useDebounce from '@/hooks/useDebounce'
import { DepartmentCreateModal } from '@/pages/DepartmentsPage/DepartmentCreateModal/DepartmentCreateModal'

import { tableColumns } from './tableColumns'

export const DepartmentsPage: FC = () => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [searchedName, setSearchedName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { data, loading, error } = useQuery<IDepartmentResult>(DEPARTMENTS)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const handleModalClose = (): void => {
    setOpen(prev => !prev)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.departments
        : data?.departments.filter(department =>
            department.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.departments, debouncedSearchTerm]
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
          <Button sx={{ maxWidth: 100 }} variant="contained" onClick={handleModalClose}>
            Create
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <CommonTable<IDepartment>
        label="departments"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {open && <DepartmentCreateModal onClose={handleModalClose} />}
    </>
  )
}
