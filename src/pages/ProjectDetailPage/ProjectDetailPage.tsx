import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Container, Divider } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ProjectDetailItem } from '@/components/views/ProjectDetailItem/ProjectDetailItem'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { PROJECT } from '@/graphql/project/projectQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { ProjectUpdateModal } from './ProjectUpdateModal/ProjectUpdateModal'

export const ProjectDetailPage: FC = () => {
  const { id: projectId } = useParams()
  const { t } = useTranslation()
  const [isVisible, toggleVisibility] = useBooleanState()
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const { data: projectData, loading: projectLoading } = useQuery(PROJECT, {
    variables: { id: projectId }
  })

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
            onClick={toggleVisibility}
          >
            {t('Update')}
          </Button>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
      <LoadingOverlay active={projectLoading}>
        <ProjectDetailItem project={projectData?.project} />
      </LoadingOverlay>
      {isVisible && <ProjectUpdateModal project={projectData} onClose={toggleVisibility} />}
    </Container>
  )
}
