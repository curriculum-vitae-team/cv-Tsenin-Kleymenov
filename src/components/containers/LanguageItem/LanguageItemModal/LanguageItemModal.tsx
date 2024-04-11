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

const LanguageItemModal: FC<ILanguageItemModalProps> = ({ userData, onClose }) => {
  const { t } = useTranslation()

  const [updateProfileLang, { loading: profileLangLoading }] = useMutation(UPDATE_PROFILE_LANGUAGE)

  const currentLanguage = userData?.profile.languages.find(
    (item, index) => item.name === userData?.profile.languages[index].name
  )

  const {
    handleSubmit,
    register,
    formState: { isDirty }
  } = useForm<IProfileLanguagesFormValues>({
    defaultValues: {
      [FORM_PROFILE_LANGUAGES_KEYS.languages]: currentLanguage?.name,
      [FORM_PROFILE_LANGUAGES_KEYS.proficiency]: currentLanguage?.proficiency
    },
    mode: 'onSubmit'
  })

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

    onClose()
  }

  return (
    <div>
      <ModalWindow onClose={onClose} title="Update language">
        <Container sx={{ minWidth: '500px' }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <AppSelect
              variant="outlined"
              value={currentLanguage?.name}
              label={t('Languages')}
              disabled
              {...register(FORM_PROFILE_LANGUAGES_KEYS.languages)}
            />
            <AppSelect
              variant="outlined"
              label={t('Proficiency')}
              items={PROFICIENCY_ARRAY}
              {...register(FORM_PROFILE_LANGUAGES_KEYS.proficiency)}
            />
            <Button
              loading={profileLangLoading}
              type="submit"
              variant="contained"
              disabled={!isDirty}
            >
              {t('Update')}
            </Button>
          </form>
        </Container>
      </ModalWindow>
    </div>
  )
}

export default LanguageItemModal
