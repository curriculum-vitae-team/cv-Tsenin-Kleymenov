import { FC, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Container, FormControlLabel } from '@mui/material'

import { IProjectsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROFILE_CVS_SCHEMA } from '@/constants/schemaOptions'
import { UPDATE_CV } from '@/graphql/cvs/updateCVMutation'
import { PROJECTS } from '@/graphql/projects/projectsQuery'
import { USER } from '@/graphql/user/userQuery'
import { createLanguagesArray } from '@/utils/createLanguagesArray'
import { createSkillsArray } from '@/utils/createSkillsArray'

import { ICVsModalProps } from './CVsModal.interfaces'
import { FORM_PROFILE_CVS_KEYS, IProfileCVsFormValues } from './CVsModal.interfaces'

export const CVsModal: FC<ICVsModalProps> = ({ CVData, userData, open, handleClose }) => {
  const { id } = useParams()
  const [updateCVMutation, { loading: updateCVLoading }] = useMutation(UPDATE_CV, {
    refetchQueries: [{ query: USER, variables: { id } }]
  })
  const { data: projectsData } = useQuery<IProjectsResult>(PROJECTS)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty }
  } = useForm<IProfileCVsFormValues>({
    defaultValues: {
      [FORM_PROFILE_CVS_KEYS.name]: CVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: CVData?.description || '',
      [FORM_PROFILE_CVS_KEYS.template]: CVData?.is_template || false
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_CVS_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileCVsFormValues> = async formData => {
    await updateCVMutation({
      variables: {
        id: CVData?.id,
        cv: {
          name: formData[FORM_PROFILE_CVS_KEYS.name],
          description: formData[FORM_PROFILE_CVS_KEYS.description],
          userId: userData?.id,
          projectsIds: projectsData?.projects.map(({ id: projectId }) => projectId) || [],
          skills: createSkillsArray(userData?.profile.skills),
          languages: createLanguagesArray(userData?.profile.languages),
          is_template: formData[FORM_PROFILE_CVS_KEYS.template]
        }
      }
    })
    handleClose()
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_CVS_KEYS.name]: CVData?.name || '',
      [FORM_PROFILE_CVS_KEYS.description]: CVData?.description || '',
      [FORM_PROFILE_CVS_KEYS.template]: CVData?.is_template || false
    })
  }, [isSubmitSuccessful])

  return (
    <ModalWindow open={open} onClose={handleClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label="Name"
            error={!!errors[FORM_PROFILE_CVS_KEYS.name]}
            helperText={errors?.[FORM_PROFILE_CVS_KEYS.name]?.message}
            {...register(FORM_PROFILE_CVS_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="Description"
            error={!!errors[FORM_PROFILE_CVS_KEYS.description]}
            helperText={errors?.[FORM_PROFILE_CVS_KEYS.description]?.message}
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
