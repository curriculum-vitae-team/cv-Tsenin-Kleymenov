import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { ILanguagesResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import useDebounce from '@/hooks/useDebounce'

import { tableColumns } from './tableColumns'

export const LanguagesPage: FC = () => {
  const { data, loading, error } = useQuery<ILanguagesResult>(LANGUAGES)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.languages
        : data?.languages.filter(language =>
            language.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.languages, debouncedSearchTerm]
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
      <CommonTable<ILanguage>
        label="languages"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
