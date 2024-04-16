import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'

import { IPositionResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { PositionCreateModal } from '@/pages/PositionsPage/PositionCreateModal/PositionCreateModal'

import { tableColumns } from './tableColumns'

export const PositionsPage: FC = () => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<IPositionResult>(POSITIONS)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const { t } = useTranslation()

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.positions
        : data?.positions.filter(position =>
            position.name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.positions, deferredValue]
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
      <CommonTable<IPosition>
        label="positions"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <PositionCreateModal onClose={toggleVisibility} />}
    </>
  )
}
