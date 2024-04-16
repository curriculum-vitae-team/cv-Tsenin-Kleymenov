import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFICIENCY_ARRAY } from '@/constants/proficiency'
import { UPDATE_PROFILE_LANGUAGE } from '@/graphql/language/profile_language/updateProfileLanguageMutation'

import {
  FORM_PROFILE_LANGUAGES_KEYS,
  IProfileLanguagesFormValues
} from '../../EmployeeLanguagesProfile/LanguagesModal/LanguagesModal.interfaces'

import { ILanguageItemModalProps } from './LanguageItemModal.interfaces'

const LanguageItemModal: FC<ILanguageItemModalProps> = ({ userData, languageInfo, onClose }) => {
  const { t } = useTranslation()

  const [updateProfileLang, { loading: profileLangLoading }] = useMutation(UPDATE_PROFILE_LANGUAGE)

  const { language, setLanguage } = languageInfo

  const languagesItems = userData?.languages.map(languageItem => {
    return {
      name: languageItem.name,
      id: languageItem.name
    }
  })

  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty }
  } = useForm<IProfileLanguagesFormValues>({
    defaultValues: {
      [FORM_PROFILE_LANGUAGES_KEYS.languages]: language?.name,
      [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: language?.proficiency
    },
    mode: 'onSubmit'
  })

  const watchProficiency = watch(FORM_PROFILE_LANGUAGES_KEYS.proficiency)

  const onSubmit: SubmitHandler<IProfileLanguagesFormValues> = async formData => {
    await updateProfileLang({
      variables: {
        language: {
          userId: userData?.id,
          name: formData[FORM_PROFILE_LANGUAGES_KEYS.languages],
          proficiency: formData[FORM_PROFILE_LANGUAGES_KEYS.proficiency]
        }
      }
    })

    setLanguage({
      name: formData[FORM_PROFILE_LANGUAGES_KEYS.languages],
      proficiency: formData[FORM_PROFILE_LANGUAGES_KEYS.proficiency]
    })

    onClose()
  }

  return (
    <ModalWindow onClose={onClose} title="updateLanguage">
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <AppSelect
            variant="outlined"
            value={language?.name || ''}
            label={t('languages')}
            items={languagesItems}
            disabled
            {...register(FORM_PROFILE_LANGUAGES_KEYS.languages)}
          />
          <AppSelect
            variant="outlined"
            label={t('proficiency')}
            value={watchProficiency || ''}
            items={PROFICIENCY_ARRAY}
            {...register(FORM_PROFILE_LANGUAGES_KEYS.proficiency)}
          />
          <Button
            loading={profileLangLoading}
            type="submit"
            variant="contained"
            disabled={!isDirty}
          >
            {t('update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}

export default LanguageItemModal
