import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_LANGUAGE_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CREATE_LANGUAGE } from '@/graphql/language/createLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import {
  FORM_LANGUAGE_KEYS,
  ILanguageFormValues
} from '@/pages/LanguagesPage/LanguagesPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

export const LanguageCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createLanguageMutation, { loading: createLanguageLoading }] = useMutation(
    CREATE_LANGUAGE,
    {
      refetchQueries: [{ query: LANGUAGES }]
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ILanguageFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_LANGUAGE_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<ILanguageFormValues> = async formData => {
    await createLanguageMutation({
      variables: {
        language: {
          name: formData[FORM_LANGUAGE_KEYS.name],
          iso2: formData[FORM_LANGUAGE_KEYS.iso2],
          native_name: formData[FORM_LANGUAGE_KEYS.native_name]
        }
      }
    })

    onClose()

    toastMessage(t('successfullyCreated'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('name')}
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
            label={t('nativeName')}
            error={!!errors[FORM_LANGUAGE_KEYS.native_name]}
            helperText={t(errors?.[FORM_LANGUAGE_KEYS.native_name]?.message as string)}
            {...register(FORM_LANGUAGE_KEYS.native_name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createLanguageLoading}
            disabled={!isDirty && isValid}
          >
            {t('create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
