import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Container, FormControlLabel } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { Loader } from '@/components/views/Loader/Loader'
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

export const CVsModal: FC<ICVsModalProps> = ({ currentCVData, open, handleClose }) => {
  const user = useReactiveVar(authService.user$)

  const { data: CVData, loading: CVLoading } = useQuery(CV, {
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
    handleClose()
  }

  return (
    <>
      {CVLoading ? (
        <Loader color="primary" />
      ) : (
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
      )}
    </>
  )
}