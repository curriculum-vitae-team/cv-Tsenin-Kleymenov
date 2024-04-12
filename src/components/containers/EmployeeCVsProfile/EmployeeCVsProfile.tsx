import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CVItem } from '@/components/containers/CVItem/CVItem'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { CVsModal } from './CVsModal/CVsModal'

export const EmployeeCVsProfile: FC = () => {
  const { id: userId } = useParams()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const { isVisible, toggleVisibility } = useBooleanState()

  const [selectedCV, setSelectedCV] = useState<ICV | null>(null)

  const { t } = useTranslation()

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
              {t('noCvs')}
            </Typography>
          )}
          {isVisible && <CVsModal onClose={toggleVisibility} currentCVData={selectedCV} />}
        </>
      )}
    </>
  )
}
