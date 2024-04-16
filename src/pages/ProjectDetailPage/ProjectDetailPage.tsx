import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box, Divider } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { PROJECT } from '@/graphql/project/projectQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { ProjectDetailItem } from './ProjectDetailItem/ProjectDetailItem'
import { ProjectUpdateModal } from './ProjectUpdateModal/ProjectUpdateModal'

export const ProjectDetailPage: FC = () => {
  const { id: projectId } = useParams()

  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { data: projectData, loading: projectLoading } = useQuery(PROJECT, {
    variables: { id: projectId }
  })

  const { t } = useTranslation()

  return (
    <>
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
            {t('update')}
          </Button>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
      <LoadingOverlay active={projectLoading}>
        <ProjectDetailItem project={projectData?.project} />
      </LoadingOverlay>
      {isVisible && <ProjectUpdateModal project={projectData} onClose={toggleVisibility} />}
    </>
  )
}
