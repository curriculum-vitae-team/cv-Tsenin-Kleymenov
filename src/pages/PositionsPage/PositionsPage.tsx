import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { IPositionResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { POSITIONS } from '@/graphql/positions/positionsQuery'

import { tableColumns } from './tableColumns'

export const PositionsPage: FC = () => {
  const { data, loading, error } = useQuery<IPositionResult>(POSITIONS)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      searchedName === ''
        ? data?.positions
        : data?.positions.filter(position =>
            position.name?.toLowerCase().includes(searchedName.toLowerCase())
          ),
    [data?.positions, searchedName]
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
      <CommonTable<IPosition>
        label="positions"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
