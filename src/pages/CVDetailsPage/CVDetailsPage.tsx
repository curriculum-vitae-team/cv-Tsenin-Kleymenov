import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'

import { CVDetailsModal } from './CVDetailsModal/CVDetailsModal'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()
  const user = useReactiveVar(authService.user$)
  const [open, setOpen] = useState<boolean>(false)

  const { data: CVData, loading: CVLoading } = useQuery(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const userCheck = CVData?.cv.user?.id === user?.id

  const handleCVsModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <>
      <LoadingOverlay active={CVLoading}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {userCheck && (
            <>
              <Button
                sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
                variant="contained"
                onClick={handleCVsModalClose}
              >
                Edit
              </Button>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          <CVDetailItem CVData={CVData?.cv} />
        </Box>
      </LoadingOverlay>
      {open && <CVDetailsModal handleClose={handleCVsModalClose} CVData={CVData?.cv} />}
    </>
  )
}
