import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { ISkillsResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import useDebounce from '@/hooks/useDebounce'

import { tableColumns } from './tableColumns'

export const SkillsPage: FC = () => {
  const { data, loading, error } = useQuery<ISkillsResult>(SKILLS)

  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const debouncedSearchTerm = useDebounce(searchedName, 150)

  const requestSearch = useMemo(
    () =>
      debouncedSearchTerm === ''
        ? data?.skills
        : data?.skills.filter(skill =>
            skill.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ),
    [data?.skills, debouncedSearchTerm]
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
      <CommonTable<ISkill>
        label="skills"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
