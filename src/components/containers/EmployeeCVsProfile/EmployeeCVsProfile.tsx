import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CVItem } from '@/components/containers/CVItem/CVItem'
import { authService } from '@/graphql/auth/authService'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICV.interfaces'
import { USER } from '@/graphql/user/userQuery'

import { CVsModal } from './CVsModal/CVsModal'

export const EmployeeCVsProfile: FC = () => {
  const { id } = useParams()
  const user = useReactiveVar(authService.user$)
  const userCheck = id === user?.id
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCV, setSelectedCV] = useState<ICV | null>(null)

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: user?.id },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const handleCVsModalClose = (): void => {
    setOpen(prev => !prev)
  }

  const handleSetCurrentCV = (CV: ICV): void => {
    setSelectedCV(CV)
    handleCVsModalClose()
  }

  return (
    <>
      {userCheck && (
        <>
          {userData?.user?.cvs?.length ? (
            userData?.user?.cvs.map(CV => (
              <CVItem key={CV.id} CV={CV} handleSetCurrentCV={handleSetCurrentCV} />
            ))
          ) : (
            <Typography sx={{ my: 2 }} variant="h5">
              You don't have any CVs
            </Typography>
          )}
          {open && (
            <CVsModal handleClose={handleCVsModalClose} currentCVData={selectedCV} />
          )}
        </>
      )}
    </>
  )
}
