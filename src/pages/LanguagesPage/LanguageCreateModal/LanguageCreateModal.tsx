import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_LANGUAGE_SCHEMA } from '@/constants/schemaOptions'
import { CREATE_LANGUAGE } from '@/graphql/languages/createLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import {
  FORM_LANGUAGE_KEYS,
  ILanguageFormValues
} from '@/pages/LanguagesPage/LanguagesPage.interfaces'

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
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label="Name"
            error={!!errors[FORM_LANGUAGE_KEYS.name]}
            helperText={errors?.[FORM_LANGUAGE_KEYS.name]?.message}
            {...register(FORM_LANGUAGE_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="iso2"
            error={!!errors[FORM_LANGUAGE_KEYS.iso2]}
            helperText={errors?.[FORM_LANGUAGE_KEYS.iso2]?.message}
            {...register(FORM_LANGUAGE_KEYS.iso2)}
          />
          <Input
            variant="outlined"
            label="Native name"
            error={!!errors[FORM_LANGUAGE_KEYS.native_name]}
            helperText={errors?.[FORM_LANGUAGE_KEYS.native_name]?.message}
            {...register(FORM_LANGUAGE_KEYS.native_name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createLanguageLoading}
            disabled={!isDirty && isValid}
          >
            Create language
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
