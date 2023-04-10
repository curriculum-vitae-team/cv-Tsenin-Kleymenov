import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CVsModal } from '@/components/containers/EmployeeCVsProfile/CVsModal/CVsModal'
import { Button } from '@/components/views/Button/Button'
import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { Loader } from '@/components/views/Loader/Loader'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { USER } from '@/graphql/user/userQuery'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()
  const user = useReactiveVar(authService.user$)
  const [open, setOpen] = useState<boolean>(false)

  const { data: CVData, loading: CVLoading } = useQuery(CV, {
    variables: { id: CVId }
  })

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id }
  })

  const userCheck = CVData?.cv.user?.id === user?.id

  const handleCVsModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <>
      {CVLoading ? (
        <Loader color="primary" />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {userCheck && (
            <>
              <Button
                sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
                variant="contained"
                onClick={handleCVsModalClose}
              >
                edit
              </Button>
              <Divider sx={{ my: 2 }} />
            </>
          )}
          <CVDetailItem cv={CVData?.cv} />
        </Box>
      )}
      {open && (
        <CVsModal
          open={open}
          handleClose={handleCVsModalClose}
          userData={userData?.user}
          CVData={CVData?.cv}
        />
      )}
    </>
  )
}
