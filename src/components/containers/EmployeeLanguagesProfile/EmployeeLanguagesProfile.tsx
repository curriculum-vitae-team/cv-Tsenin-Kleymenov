import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Box, Container, Divider, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { LanguageItem } from '@/components/containers/LanguageItem/LanguageItem'
import { Button } from '@/components/views/Button/Button'
import { authService } from '@/graphql/auth/authService'
import { USER } from '@/graphql/user/userQuery'

import { LanguagesModal } from './LanguagesModal/LanguagesModal'

export const EmployeeLanguagesProfile: FC = () => {
  const { id: userId } = useParams()
  const user = useReactiveVar(authService.user$)
  const userCheck = userId === user?.id
  const [open, setOpen] = useState(false)
  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const handleLanguageModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      {userCheck && (
        <Button
          sx={{ maxWidth: 210, my: 3, alignSelf: 'flex-end' }}
          variant="contained"
          onClick={handleLanguageModalClose}
        >
          + Add Languages
        </Button>
      )}
      <Divider />
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
      {open && (
        <LanguagesModal
          open={open}
          userData={userData?.user}
          handleClose={handleLanguageModalClose}
        />
      )}
    </Container>
  )
}
