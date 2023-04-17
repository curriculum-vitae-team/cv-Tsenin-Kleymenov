import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { LanguageItem } from '@/components/containers/LanguageItem/LanguageItem'
import { Button } from '@/components/views/Button/Button'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { LanguagesModal } from './LanguagesModal/LanguagesModal'

export const EmployeeLanguagesProfile: FC = () => {
  const { t } = useTranslation()
  const { id: userId } = useParams()
  const [isVisible, toggleVisibility] = useBooleanState()
  const user = useReactiveVar(authService.user$)
  const userCheck = userId === user?.id
  const isAdmin = user?.role === ROLE.admin

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {(userCheck || isAdmin) && (
        <Button
          sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={toggleVisibility}
        >
          {t('Add languages')}
        </Button>
      )}
      <Divider sx={{ my: 2 }} />
      {userData?.user?.profile.languages.length ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {userData?.user?.profile?.languages.map(item => (
            <LanguageItem
              key={item.language_name}
              languageName={item.language_name}
              languageProficiency={item.proficiency}
            />
          ))}
        </Box>
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          {t('No languages')}
        </Typography>
      )}
      {isVisible && <LanguagesModal userData={userData?.user} onClose={toggleVisibility} />}
    </Box>
  )
}
