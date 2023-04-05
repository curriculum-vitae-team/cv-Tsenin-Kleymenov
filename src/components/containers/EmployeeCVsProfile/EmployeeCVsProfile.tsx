import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Container } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CVItem } from '@/components/containers/CVItem/CVItem'
import { authService } from '@/graphql/auth/authService'
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
    variables: { id: user?.id }
  })

  const handleСVsModalClose = (): void => {
    setOpen(prev => !prev)
  }

  const handleSetCurrentCV = (CV: ICV): void => {
    setSelectedCV(CV)
    handleСVsModalClose()
  }

  return (
    <>
      {userCheck && (
        <Container sx={{ my: 2 }} maxWidth="lg">
          {userData?.user?.cvs &&
            userData?.user?.cvs.map(CV => (
              <CVItem key={CV.id} CV={CV} handleSetCurrentCV={handleSetCurrentCV} />
            ))}
          {open && (
            <CVsModal
              open={open}
              handleClose={handleСVsModalClose}
              userData={userData?.user}
              CVData={selectedCV}
            />
          )}
        </Container>
      )}
    </>
  )
}
