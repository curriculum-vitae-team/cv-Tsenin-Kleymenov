import { FC, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { InputWithIcon } from '@/components/views/Input/Input'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'

import { tableColumns } from './tableColumns'

export const ProjectsPage: FC = () => {
  const { data, loading, error } = useQuery<IProjectsResult>(GET_PROJECTS)

  const [searchedName, setSearchedName] = useState<string>('')

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
      <InputWithIcon
        icon={<SearchIcon fontSize="small" />}
        position="start"
        size="small"
        style={{ marginBottom: '20px' }}
        value={searchedName}
        onChange={handleSearchUser}
        placeholder="Search"
      />
      <CommonTable<IProject>
        label="projects"
        data={requestSearch}
        tableColumns={tableColumns}
        isLoading={loading}
        error={error}
      />
    </>
  )
}
