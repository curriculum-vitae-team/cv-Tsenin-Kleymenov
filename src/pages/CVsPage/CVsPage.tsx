import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { ICVsResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICV.interfaces'

import { tableColumns } from './tableColumns'

export const CVsPage: FC = () => {
  const { data, loading, error } = useQuery<ICVsResult>(GET_CVS, {
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      searchedName === ''
        ? data?.cvs
        : data?.cvs.filter(cv => cv.name?.toLowerCase().includes(searchedName.toLowerCase())),
    [data?.cvs, searchedName]
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
      <CommonTable<ICV>
        label="cvs"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
