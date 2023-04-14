import { FC, useMemo, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider } from '@mui/material'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { ProjectCreateModal } from './ProjectCreateModal/ProjectCreateModal'
import { tableColumns } from './tableColumns'

export const ProjectsPage: FC = () => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()
  const [searchedName, setSearchedName] = useState<string>('')

  const { data, loading, error } = useQuery<IProjectsResult>(GET_PROJECTS)

  const handleSearchUser = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const requestSearch = useMemo(
    () =>
      searchedName === ''
        ? data?.projects
        : data?.projects.filter(
            project =>
              project.name?.toLowerCase().includes(searchedName.toLowerCase()) ||
              project.internal_name?.toLowerCase().includes(searchedName.toLowerCase())
          ),
    [data?.projects, searchedName]
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
          placeholder="Search"
        />
        {isAdmin && (
          <Button sx={{ maxWidth: 100 }} variant="contained" onClick={toggleVisibility}>
            Create
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
