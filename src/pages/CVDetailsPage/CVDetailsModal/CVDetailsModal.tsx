import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useReactiveVar } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Container, FormControlLabel } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { authService } from '@/graphql/auth/authService'
import { CV } from '@/graphql/cv/CVQuery'
import { UPDATE_CV } from '@/graphql/cv/updateCVMutation'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createProjectsIdArray } from '@/utils/createProjectsIdArray'
import { createSkillsArray } from '@/utils/createSkillsArray'

import {
  FORM_PROFILE_CVS_KEYS,
  ICVDetailsFormValues,
  ICVDetailsModalProps
} from './CVDetailsModal.interfaces'

export const CVDetailsModal: FC<ICVDetailsModalProps> = ({ CVData, onClose }) => {
  const user = useReactiveVar(authService.user$)
  const { t } = useTranslation()

  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: CV, variables: { id: CVData?.id } }]
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<ICVDetailsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: CVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: CVData?.description || '',
      [FORM_PROFILE_CVS_KEYS.template]: CVData?.is_template || false
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const onSubmit: SubmitHandler<ICVDetailsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.id,
        cv: {
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          description: formData[FORM_PROFILE_CVS_KEYS.description],
          userId: user?.id,
          projectsIds: createProjectsIdArray(CVData?.projects),
          skills: createSkillsArray(CVData?.skills),
          languages: createLanguagesArray(CVData?.languages),
          is_template: formData[FORM_PROFILE_CVS_KEYS.template]
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
            error={!!errors[FORM_PROFILE_CVS_KEYS.name]}
            helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.name]?.message as string)}
            {...register(FORM_PROFILE_CVS_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="Description"
            error={!!errors[FORM_PROFILE_CVS_KEYS.description]}
            helperText={t(errors?.[FORM_PROFILE_CVS_KEYS.description]?.message as string)}
            {...register(FORM_PROFILE_CVS_KEYS.description)}
          />
          <Controller
            control={control}
            name={FORM_PROFILE_CVS_KEYS.template}
            render={({ field: { value, onChange, onBlur } }) => (
              <FormControlLabel
                label="Template"
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
  )
}
