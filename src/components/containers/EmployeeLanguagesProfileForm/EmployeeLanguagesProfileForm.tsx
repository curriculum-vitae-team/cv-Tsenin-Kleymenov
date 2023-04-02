import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, Divider, Typography } from '@mui/material'

import { ILanguagesResult, IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFICIENCY_ARRAY } from '@/constants/proficiency'
import { FORM_PROFILE_LANGUAGES_SCHEMA } from '@/constants/schemaOptions'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { createLanguagesArray } from '@/utils/createLanguagesArray'

import { LanguageItem } from '../LanguageItem/LanguageItem'

import {
  FORM_PROFILE_LANGUAGES_KEYS,
  IProfileLanguagesFormValues
} from './EmployeeLanguagesProfileForm.interfaces'

export const EmployeeLanguagesProfileForm: FC = () => {
  const { id: userId } = useParams()
  const [open, setOpen] = useState(false)
  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })
  const { loading: loadingLanguages, data: languagesData } = useQuery<ILanguagesResult>(LANGUAGES)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
  })

  const languagesNameArray = userData?.user.profile.languages.map(item => item.language_name)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isValid }
  } = useForm<IProfileLanguagesFormValues>({
    defaultValues: {
      [FORM_PROFILE_LANGUAGES_KEYS.languages]: '',
      [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_LANGUAGES_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileLanguagesFormValues> = async formData => {
    await updateUser({
      variables: {
        id: userId,
        user: {
          profile: {
            first_name: userData?.user?.profile.first_name || '',
            last_name: userData?.user?.profile.last_name || '',
            languages: [
              {
                language_name: formData[FORM_PROFILE_LANGUAGES_KEYS.languages],
                proficiency: formData[FORM_PROFILE_LANGUAGES_KEYS.proficiency]
              },
              ...createLanguagesArray(userData?.user?.profile.languages)
            ]
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || ''
        }
      }
    })
    setOpen(false)
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_LANGUAGES_KEYS.languages]: '',
      [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: ''
    })
  }, [isSubmitSuccessful])

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      <Button
        sx={{ maxWidth: 210, my: 3, alignSelf: 'flex-end' }}
        variant="contained"
        onClick={handleClickOpen}
      >
        + Add Languages
      </Button>
      <Divider />

      {languagesNameArray?.length ? (
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

      <ModalWindow modalOpen={open} closeModal={handleClose}>
        <Container sx={{ minWidth: '500px' }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <AppSelect
              variant="outlined"
              label="Skills"
              defaultValue={''}
              loading={loadingLanguages}
              items={languagesData?.languages.filter(
                element => !languagesNameArray?.includes(element.name)
              )}
              error={!!errors[FORM_PROFILE_LANGUAGES_KEYS.languages]}
              helperText={errors?.[FORM_PROFILE_LANGUAGES_KEYS.languages]?.message}
              {...register(FORM_PROFILE_LANGUAGES_KEYS.languages)}
            />
            <AppSelect
              variant="outlined"
              label="Mastery"
              defaultValue={''}
              items={PROFICIENCY_ARRAY}
              error={!!errors[FORM_PROFILE_LANGUAGES_KEYS.proficiency]}
              helperText={errors?.[FORM_PROFILE_LANGUAGES_KEYS.proficiency]?.message}
              {...register(FORM_PROFILE_LANGUAGES_KEYS.proficiency)}
            />
            <Button loading={userLoading} type="submit" variant="contained" disabled={!isValid}>
              Save
            </Button>
          </form>
        </Container>
      </ModalWindow>
    </Container>
  )
}
