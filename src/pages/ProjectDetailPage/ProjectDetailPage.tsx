import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Container, Divider } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ProjectDetailItem } from '@/components/views/ProjectDetailItem/ProjectDetailItem'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { PROJECT } from '@/graphql/project/projectQuery'

import { ProjectUpdateModal } from './ProjectUpdateModal/ProjectUpdateModal'

export const ProjectDetailPage: FC = () => {
  const { id: projectId } = useParams()
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [open, setOpen] = useState<boolean>(false)

  const { data: projectData, loading: projectLoading } = useQuery(PROJECT, {
    variables: { id: projectId }
  })

  const handleModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Container maxWidth="lg">
      {isAdmin && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Button
            sx={{ maxWidth: 100, alignSelf: 'flex-end' }}
            variant="contained"
            onClick={handleModalClose}
          >
            Update
          </Button>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
      <LoadingOverlay active={projectLoading}>
        <ProjectDetailItem project={projectData?.project} />
      </LoadingOverlay>
      {open && <ProjectUpdateModal project={projectData} onClose={handleModalClose} />}
    </Container>
  )
}
