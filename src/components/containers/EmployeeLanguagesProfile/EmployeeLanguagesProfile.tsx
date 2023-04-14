import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { LanguageItem } from '@/components/containers/LanguageItem/LanguageItem'
import { Button } from '@/components/views/Button/Button'
import { authService } from '@/graphql/auth/authService'
import { USER } from '@/graphql/user/userQuery'
import { useBooleanState } from '@/hooks/useBooleanState'

import { LanguagesModal } from './LanguagesModal/LanguagesModal'

export const EmployeeLanguagesProfile: FC = () => {
  const { id: userId } = useParams()
  const [isVisible, toggleVisibility] = useBooleanState()
  const user = useReactiveVar(authService.user$)
  const userCheck = userId === user?.id

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {userCheck && (
        <Button
          sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={toggleVisibility}
        >
          + Add Languages
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
          You don't have any languages
        </Typography>
      )}
      {isVisible && <LanguagesModal userData={userData?.user} onClose={toggleVisibility} />}
    </Box>
  )
}
