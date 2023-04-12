import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Container } from '@mui/material'

import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ProjectDetailItem } from '@/components/views/ProjectDetailItem/ProjectDetailItem'
import { PROJECT } from '@/graphql/project/projectQuery'

export const ProjectDetailPage: FC = () => {
  const { id: projectId } = useParams()
  const { data: projectData, loading: projectLoading } = useQuery(PROJECT, {
    variables: { id: projectId }
  })

  return (
    <Container maxWidth="lg">
      <LoadingOverlay active={projectLoading}>
        <ProjectDetailItem project={projectData?.project} />
      </LoadingOverlay>
    </Container>
  )
}
