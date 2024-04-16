import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { ILanguagesResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { LanguageCreateModal } from './LanguageCreateModal/LanguageCreateModal'
import { tableColumns } from './tableColumns'

export const LanguagesPage: FC = () => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<ILanguagesResult>(LANGUAGES)

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.languages
        : data?.languages.filter(language =>
            language.name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.languages, deferredValue]
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
      <CommonTable<ILanguage>
        label="languages"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <LanguageCreateModal onClose={toggleVisibility} />}
    </>
  )
}
