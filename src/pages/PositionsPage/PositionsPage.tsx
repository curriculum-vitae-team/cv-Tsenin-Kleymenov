import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { IPositionResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import useDebounce from '@/hooks/useDebounce'

import { tableColumns } from './tableColumns'

export const PositionsPage: FC = () => {
  const { data, loading, error } = useQuery<IPositionResult>(POSITIONS)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.positions
        : data?.positions.filter(position =>
            position.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.positions, debouncedSearchTerm]
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
