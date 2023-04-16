import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Container, FormControlLabel } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createProjectsIdArray } from '@/utils/createProjectsIdArray'
import { createSkillsArray } from '@/utils/createSkillsArray'

import { ICVsModalProps } from './CVsModal.interfaces'
import { FORM_PROFILE_CVS_KEYS, IProfileCVsFormValues } from './CVsModal.interfaces'

export const CVsModal: FC<ICVsModalProps> = ({ currentCVData, onClose }) => {
  const { t } = useTranslation()
  const user = useReactiveVar(authService.user$)

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: currentCVData?.id },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<IProfileCVsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: currentCVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: currentCVData?.description || '',
      [FORM_PROFILE_CVS_KEYS.template]: currentCVData?.is_template || false
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileCVsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.cv.id,
        cv: {
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          description: formData[FORM_PROFILE_CVS_KEYS.description],
          userId: user?.id,
          projectsIds: createProjectsIdArray(CVData?.cv.projects),
          skills: createSkillsArray(CVData?.cv.skills),
          languages: createLanguagesArray(CVData?.cv.languages),
          is_template: formData[FORM_PROFILE_CVS_KEYS.template]
        }
      }
    })

    onClose()
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
            <Controller
              control={control}
              name={FORM_PROFILE_CVS_KEYS.template}
              render={({ field: { value, onChange, onBlur } }) => (
                <FormControlLabel
                  label={t('Template')}
                  control={<Checkbox checked={value} onChange={onChange} onBlur={onBlur} />}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              loading={updateCVLoading}
              disabled={!isDirty && isValid}
            >
              Save
            </Button>
          </form>
        </Container>
      </ModalWindow>
    </LoadingOverlay>
  )
}
