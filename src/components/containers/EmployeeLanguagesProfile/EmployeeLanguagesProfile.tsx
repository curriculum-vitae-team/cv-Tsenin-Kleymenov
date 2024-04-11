import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { LanguageItem } from '@/components/containers/LanguageItem/LanguageItem'
import { Button } from '@/components/views/Button/Button'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'

import { LanguagesModal } from './LanguagesModal/LanguagesModal'

export const EmployeeLanguagesProfile: FC = () => {
  const { id: userId } = useParams()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const { isVisible, toggleVisibility } = useBooleanState()

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const { t } = useTranslation()

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
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {userData?.user?.profile?.languages.map(item => (
            <LanguageItem
              key={item.name}
              languageName={item.name}
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
