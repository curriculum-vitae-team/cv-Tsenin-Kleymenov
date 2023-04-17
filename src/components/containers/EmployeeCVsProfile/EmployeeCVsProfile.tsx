import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CVItem } from '@/components/containers/CVItem/CVItem'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { CVsModal } from './CVsModal/CVsModal'

export const EmployeeCVsProfile: FC = () => {
  const { id: userId } = useParams()
  const { t } = useTranslation()
  const user = useReactiveVar(authService.user$)
  const userCheck = userId === user?.id
  const isAdmin = user?.role === ROLE.admin
  
  const [isVisible, toggleVisibility] = useBooleanState()
  const [selectedCV, setSelectedCV] = useState<ICV | null>(null)

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const handleSetCurrentCV = (CV: ICV): void => {
    setSelectedCV(CV)
    toggleVisibility()
  }

  return (
    <>
      {(userCheck || isAdmin) && (
        <>
          {userData?.user?.cvs?.length ? (
            userData?.user?.cvs.map(CV => (
              <CVItem key={CV.id} CV={CV} handleSetCurrentCV={handleSetCurrentCV} />
            ))
          ) : (
            <Typography sx={{ my: 2 }} variant="h5">
              {t('No CVs')}
            </Typography>
          )}
          {isVisible && <CVsModal onClose={toggleVisibility} currentCVData={selectedCV} />}
        </>
      )}
    </>
  )
}
