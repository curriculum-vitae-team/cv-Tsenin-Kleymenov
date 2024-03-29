import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import ClearIcon from '@mui/icons-material/Clear'
import { Box, Typography } from '@mui/material'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { createLanguagesArray } from '@/utils/createLanguagesArray'

import { ILanguageItemProps } from './LanguageItem.interfaces'
import { CloseButton, LanguageItemContainer } from './LanguageItem.styles'

export const LanguageItem: FC<ILanguageItemProps> = ({ languageName, languageProficiency }) => {
  const { id: userId } = useParams()
  const { user, isAdmin } = useUser()
  const userCheck = userId === user?.id

  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
  })

  const { t } = useTranslation()

  const handleDelete = (language_name: string, proficiency: string): void => {
    updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user.profile.first_name || '',
            last_name: userData?.user.profile.last_name || '',
            languages: createLanguagesArray(userData?.user.profile.languages).filter(
              elem => elem.language_name !== language_name || elem.proficiency !== proficiency
            )
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || ''
        }
      }
    })
  }

  return (
    <LanguageItemContainer>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>{languageName}</Typography>
        <Typography>{`${t('Level of language')}: ${languageProficiency.toUpperCase()}`}</Typography>
      </Box>
      {(userCheck || isAdmin) && (
        <CloseButton onClick={() => handleDelete(languageName, languageProficiency)}>
          <ClearIcon />
        </CloseButton>
      )}
    </LanguageItemContainer>
  )
}
