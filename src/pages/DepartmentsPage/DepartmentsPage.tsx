import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { IDepartmentResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { DepartmentCreateModal } from '@/pages/DepartmentsPage/DepartmentCreateModal/DepartmentCreateModal'

import { tableColumns } from './tableColumns'

export const DepartmentsPage: FC = () => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<IDepartmentResult>(DEPARTMENTS)

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.departments
        : data?.departments.filter(department =>
            department.name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.departments, deferredValue]
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
          placeholder={t('search') as string}
        />
        {isAdmin && (
          <Button sx={{ maxWidth: 100 }} variant="contained" onClick={toggleVisibility}>
            {t('create')}
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
      {isVisible && <DepartmentCreateModal onClose={toggleVisibility} />}
    </>
  )
}
