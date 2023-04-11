import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { IDepartmentResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'

import { tableColumns } from './tableColumns'

export const DepartmentsPage: FC = () => {
  const { data, loading, error } = useQuery<IDepartmentResult>(DEPARTMENTS)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      searchedName === ''
        ? data?.departments
        : data?.departments.filter(department =>
            department.name?.toLowerCase().includes(searchedName.toLowerCase())
          ),
    [data?.departments, searchedName]
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
      <CommonTable<IDepartment>
        label="departments"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
