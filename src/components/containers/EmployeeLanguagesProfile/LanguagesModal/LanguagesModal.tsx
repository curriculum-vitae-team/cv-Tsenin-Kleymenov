import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { ILanguagesResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFICIENCY_ARRAY } from '@/constants/proficiency'
import { FORM_PROFILE_LANGUAGES_SCHEMA } from '@/constants/schemaOptions'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { createLanguagesArray } from '@/utils/createLanguagesArray'

import {
  FORM_PROFILE_LANGUAGES_KEYS,
  ILanguagesModalProps,
  IProfileLanguagesFormValues
} from './LanguagesModal.interfaces'

export const LanguagesModal: FC<ILanguagesModalProps> = ({ userData, onClose }) => {
  const { loading: loadingLanguages, data: languagesData } = useQuery<ILanguagesResult>(LANGUAGES)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER)

  const languagesNameArray = userData?.profile.languages.map(item => item.language_name)
  const filteredLanguagesArray = languagesData?.languages
    .filter(element => !languagesNameArray?.includes(element.name))
    .map(language => {
      return {
        name: language.name,
        id: language.name
      }
    })

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
        id: userData?.id,
        user: {
          profile: {
            first_name: userData?.profile.first_name || '',
            last_name: userData?.profile.last_name || '',
            languages: [
              {
                language_name: formData[FORM_PROFILE_LANGUAGES_KEYS.languages],
                proficiency: formData[FORM_PROFILE_LANGUAGES_KEYS.proficiency]
              },
              ...createLanguagesArray(userData?.profile.languages)
            ]
          },
          departmentId: userData?.department?.id || '',
          positionId: userData?.position?.id || ''
        }
      }
    })
    
    onClose()
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_LANGUAGES_KEYS.languages]: '',
      [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: ''
    })
  }, [isSubmitSuccessful])

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <AppSelect
            variant="outlined"
            label="Languages"
            defaultValue=''
            loading={loadingLanguages}
            items={filteredLanguagesArray}
            error={!!errors[FORM_PROFILE_LANGUAGES_KEYS.languages]}
            helperText={errors?.[FORM_PROFILE_LANGUAGES_KEYS.languages]?.message}
            {...register(FORM_PROFILE_LANGUAGES_KEYS.languages)}
          />
          <AppSelect
            variant="outlined"
            label="Proficiency"
            defaultValue=''
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
  )
}
