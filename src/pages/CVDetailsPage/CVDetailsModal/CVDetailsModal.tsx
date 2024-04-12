import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createProjectsIdArray } from '@/utils/createProjectsIdArray'
import { createSkillsArray } from '@/utils/createSkillsArray'
import { toastMessage } from '@/utils/toastMessage'

import {
  FORM_PROFILE_CVS_KEYS,
  ICVDetailsFormValues,
  ICVDetailsModalProps
} from './CVDetailsModal.interfaces'

export const CVDetailsModal: FC<ICVDetailsModalProps> = ({ CVData, onClose }) => {
  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CV, variables: { id: CVData?.id } }]
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ICVDetailsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: CVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: CVData?.description || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<ICVDetailsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.id,
        cv: {
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          description: formData[FORM_PROFILE_CVS_KEYS.description],
          userId: CVData?.user.id,
          projectsIds: createProjectsIdArray(CVData?.projects),
          skills: createSkillsArray(CVData?.skills),
          languages: createLanguagesArray(CVData?.languages)
        }
      }
    })

    onClose()

    toastMessage(t('successfullyUpdated'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label="name"
            error={!!errors[FORM_PROFILE_CVS_KEYS.name]}
            helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.name]?.message as string)}
            {...register(FORM_PROFILE_CVS_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="description"
            error={!!errors[FORM_PROFILE_CVS_KEYS.description]}
            helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.description]?.message as string)}
            {...register(FORM_PROFILE_CVS_KEYS.description)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={updateCVLoading}
            disabled={!isDirty && isValid}
          >
            {t('save')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
