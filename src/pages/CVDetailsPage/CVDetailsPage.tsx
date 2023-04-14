import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { useBooleanState } from '@/hooks/useBooleanState'

import { CVDetailsModal } from './CVDetailsModal/CVDetailsModal'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()
  const [isVisible, toggleVisibility] = useBooleanState()
  const user = useReactiveVar(authService.user$)

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const userCheck = CVData?.cv.user?.id === user?.id

  return (
    <>
      <LoadingOverlay active={CVLoading}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {userCheck && (
            <>
              <Button
                sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
                variant="contained"
                onClick={toggleVisibility}
              >
                Edit
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
