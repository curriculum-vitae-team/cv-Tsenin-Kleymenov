import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { ICVsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { useBooleanState } from '@/hooks/useBooleanState'
import { CreateCVModal } from '@/pages/CVsPage/CreateCVModal/CreateCVModal'

import { CvsTableToolBar } from './CVsPage.styles'
import { tableColumns } from './tableColumns'

export const CVsPage: FC = () => {
  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<ICVsResult>(GET_CVS, {
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.cvs
        : data?.cvs.filter(cv => cv.name?.toLowerCase().includes(deferredValue.toLowerCase())),
    [data?.cvs, deferredValue]
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
          placeholder={t('Search') as string}
        />
        <Button sx={{ maxWidth: 100 }} variant="contained" onClick={toggleVisibility}>
          {t('Create')}
        </Button>
      </CvsTableToolBar>
      <CommonTable<ICV>
        label="cvs"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <CreateCVModal onClose={toggleVisibility} />}
    </>
  )
}
