import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Button } from '@mui/material'

import { ICVsResult } from '@/appTypes/IResult.interfaces'
import { CreateCVModal } from '@/components/containers/CreateCVModal/CreateCVModal'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import useDebounce from '@/hooks/useDebounce'

import { CvsTableToolBar } from './CVsPage.styles'
import { tableColumns } from './tableColumns'

export const CVsPage: FC = () => {
  const { data, loading, error } = useQuery<ICVsResult>(GET_CVS, {
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.cvs
        : data?.cvs.filter(cv =>
            cv.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.cvs, debouncedSearchTerm]
  )

  return (
    <>
      <CvsTableToolBar>
        <InputWithIcon
          icon={<SearchIcon fontSize="small" />}
          position="start"
          size="small"
          value={searchedName}
          onChange={handleSearchUser}
          placeholder="Search"
        />
        <ButtonWithDialog />
      </CvsTableToolBar>
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

const ButtonWithDialog: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCVsModalOpenClose = (): void => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <Button variant="contained" onClick={handleCVsModalOpenClose}>
        Create Cv
      </Button>
      {isOpen && <CreateCVModal isOpen={isOpen} handleOpenClose={handleCVsModalOpenClose} />}
    </>
  )
}
