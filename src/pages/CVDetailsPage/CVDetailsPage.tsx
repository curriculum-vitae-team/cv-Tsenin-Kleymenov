import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box, Divider } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { CV } from '@/graphql/cv/CVQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { CVDetailsModal } from './CVDetailsModal/CVDetailsModal'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const { user, isAdmin } = useUser()
  const userCheck = CVData?.cv.user?.id === user?.id

  const { isVisible, toggleVisibility } = useBooleanState()

  const { t } = useTranslation()

  return (
    <>
      <LoadingOverlay active={CVLoading}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {(userCheck || isAdmin) && (
            <>
              <Button
                sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
                variant="contained"
                onClick={toggleVisibility}
              >
                {t('Edit')}
              </Button>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          <CVDetailItem CVData={CVData?.cv} />
        </Box>
      </LoadingOverlay>
      {isVisible && <CVDetailsModal onClose={toggleVisibility} CVData={CVData?.cv} />}
    </>
  )
}
