import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_LANGUAGE_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { UPDATE_LANGUAGE } from '@/graphql/languages/updateLanguageMutation'
import {
  FORM_LANGUAGE_KEYS,
  ILanguageFormValues
} from '@/pages/LanguagesPage/LanguagesPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

import { ILanguageUpdateModalProps } from './LanguageUpdateModal.interfaces'

export const LanguageUpdateModal: FC<ILanguageUpdateModalProps> = ({ language, onClose }) => {
  const { t } = useTranslation()
  const [updateLanguageMutation, { loading: updateLanguageLoading }] = useMutation(
    UPDATE_LANGUAGE,
    {
      refetchQueries: [{ query: LANGUAGES }]
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ILanguageFormValues>({
    defaultValues: {
      [FORM_LANGUAGE_KEYS.name]: language?.name || '',
      [FORM_LANGUAGE_KEYS.iso2]: language?.iso2 || '',
      [FORM_LANGUAGE_KEYS.native_name]: language?.native_name || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_LANGUAGE_SCHEMA)
  })

  const onSubmit: SubmitHandler<ILanguageFormValues> = async formData => {
    await updateLanguageMutation({
      variables: {
        id: language?.id,
        language: {
          name: formData[FORM_LANGUAGE_KEYS.name],
          iso2: formData[FORM_LANGUAGE_KEYS.iso2],
          native_name: formData[FORM_LANGUAGE_KEYS.native_name]
        }
      }
    })

    onClose()

    toastMessage(t('Successfully updated'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('Name')}
            error={!!errors[FORM_LANGUAGE_KEYS.name]}
            helperText={t(errors?.[FORM_LANGUAGE_KEYS.name]?.message as string)}
            {...register(FORM_LANGUAGE_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="iso2"
            error={!!errors[FORM_LANGUAGE_KEYS.iso2]}
            helperText={t(errors?.[FORM_LANGUAGE_KEYS.iso2]?.message as string)}
            {...register(FORM_LANGUAGE_KEYS.iso2)}
          />
          <Input
            variant="outlined"
            label={t('Native name')}
            error={!!errors[FORM_LANGUAGE_KEYS.native_name]}
            helperText={t(errors?.[FORM_LANGUAGE_KEYS.native_name]?.message as string)}
            {...register(FORM_LANGUAGE_KEYS.native_name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={updateLanguageLoading}
            disabled={!isDirty && isValid}
          >
            {t('Update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
