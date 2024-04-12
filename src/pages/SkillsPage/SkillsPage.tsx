import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { ISkillsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { SkillCreateModal } from '@/pages/SkillsPage/SkillCreateModal/SkillCreateModal'

import { tableColumns } from './tableColumns'

export const SkillsPage: FC = () => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<ISkillsResult>(SKILLS)

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.skills
        : data?.skills.filter(skill =>
            skill.name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.skills, deferredValue]
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
      <Divider sx={{ my: 2 }} />
      <CommonTable<ISkill>
        label="skills"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <SkillCreateModal onClose={toggleVisibility} />}
    </>
  )
}
