import { FC } from 'react'
import { useQuery } from '@apollo/client'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'

import { tableColumns } from './tableColumns'

export const ProjectsPage: FC = () => {
  const { data, loading, error } = useQuery<IProjectsResult>(GET_PROJECTS)

  return (
    <CommonTable<IProject>
      label="projects"
      data={data?.projects}
      tableColumns={tableColumns}
      isLoading={loading}
      error={error}
    />
  )
}
