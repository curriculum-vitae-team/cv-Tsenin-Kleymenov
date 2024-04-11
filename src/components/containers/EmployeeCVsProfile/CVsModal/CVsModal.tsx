import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createProjectsIdArray } from '@/utils/createProjectsIdArray'
import { createSkillsArray } from '@/utils/createSkillsArray'
import { toastMessage } from '@/utils/toastMessage'

import { ICVsModalProps } from './CVsModal.interfaces'
import { FORM_PROFILE_CVS_KEYS, IProfileCVsFormValues } from './CVsModal.interfaces'

export const CVsModal: FC<ICVsModalProps> = ({ currentCVData, onClose }) => {
  const { id: userId } = useParams()

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: currentCVData?.id },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IProfileCVsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: currentCVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: currentCVData?.description || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IProfileCVsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.cv.id,
        cv: {
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          description: formData[FORM_PROFILE_CVS_KEYS.description],
          userId: userId,
          projectsIds: createProjectsIdArray(CVData?.cv.projects),
          skills: createSkillsArray(CVData?.cv.skills),
          languages: createLanguagesArray(CVData?.cv.languages)
        }
      }
    })

    onClose()

    toastMessage(t('Successfully updated'), TOAST_TYPES.success)
  }

  return (
    <LoadingOverlay active={CVLoading}>
      <ModalWindow onClose={onClose}>
        <Container sx={{ minWidth: '500px' }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Input
              variant="outlined"
              label={t('Name')}
              error={!!errors[FORM_PROFILE_CVS_KEYS.name]}
              helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.name]?.message as string)}
              {...register(FORM_PROFILE_CVS_KEYS.name)}
            />
            <Input
              variant="outlined"
              label={t('Description')}
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
              {t('Save')}
            </Button>
          </form>
        </Container>
      </ModalWindow>
    </LoadingOverlay>
  )
}
