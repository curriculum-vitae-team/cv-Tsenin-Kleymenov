import { FC, useDeferredValue, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { ProjectCreateModal } from './ProjectCreateModal/ProjectCreateModal'
import { tableColumns } from './tableColumns'

export const ProjectsPage: FC = () => {
  const [isAdmin] = useUser()

  const [isVisible, toggleVisibility] = useBooleanState()

  const [searchedName, setSearchedName] = useState<string>('')
  const deferredValue = useDeferredValue(searchedName)

  const { data, loading, error } = useQuery<IProjectsResult>(GET_PROJECTS)

  const { t } = useTranslation()

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      deferredValue === ''
        ? data?.projects
        : data?.projects.filter(
            project =>
              project.name?.toLowerCase().includes(deferredValue.toLowerCase()) ||
              project.internal_name?.toLowerCase().includes(deferredValue.toLowerCase())
          ),
    [data?.projects, deferredValue]
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
          placeholder={t('Search') as string}
        />
        {isAdmin && (
          <Button sx={{ maxWidth: 100 }} variant="contained" onClick={toggleVisibility}>
            {t('Create')}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <CommonTable<IProject>
        label="projects"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
      {isVisible && <ProjectCreateModal onClose={toggleVisibility} />}
    </>
  )
}
