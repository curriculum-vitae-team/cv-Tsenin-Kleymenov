import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { DatePicker } from '@/components/views/DatePicker/DatePicker'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROJECT_SCHEMA } from '@/constants/schemaOptions'
import { UPDATE_PROJECT } from '@/graphql/project/updateProjectMutation'
import { FORM_PROJECT_KEYS, IProjectFormValues } from '@/pages/ProjectsPage/ProjectsPage.interfaces'
import { convertDate, convertDateToFormValue } from '@/utils/dateHelper'

import { IProjectUpdateModalProps } from './ProjectUpdateModal.interfaces'

export const ProjectUpdateModal: FC<IProjectUpdateModalProps> = ({ project, onClose }) => {
  const [updateProjectMutation, { loading: updateProjectLoading }] = useMutation(UPDATE_PROJECT)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<IProjectFormValues>({
    defaultValues: {
      [FORM_PROJECT_KEYS.name]: project?.project?.name,
      [FORM_PROJECT_KEYS.internal_name]: project?.project?.internal_name,
      [FORM_PROJECT_KEYS.description]: project?.project?.description,
      [FORM_PROJECT_KEYS.domain]: project?.project?.domain,
      [FORM_PROJECT_KEYS.start_date]: convertDateToFormValue(project?.project?.start_date),
      [FORM_PROJECT_KEYS.end_date]: convertDateToFormValue(project?.project?.end_date),
      [FORM_PROJECT_KEYS.team_size]: project?.project?.team_size
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROJECT_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProjectFormValues> = async formData => {
    await updateProjectMutation({
      variables: {
        id: project?.project?.id,
        project: {
          name: formData[FORM_PROJECT_KEYS.name],
          internal_name: formData[FORM_PROJECT_KEYS.internal_name],
          description: formData[FORM_PROJECT_KEYS.description],
          domain: formData[FORM_PROJECT_KEYS.domain],
          start_date: convertDate(formData[FORM_PROJECT_KEYS.start_date]),
          end_date: convertDate(formData[FORM_PROJECT_KEYS.end_date]),
          team_size: formData[FORM_PROJECT_KEYS.team_size],
          skillsIds: []
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
            error={!!errors[FORM_PROJECT_KEYS.name]}
            helperText={errors?.[FORM_PROJECT_KEYS.name]?.message}
            {...register(FORM_PROJECT_KEYS.name)}
          />
          <Input
            variant="outlined"
            label="Internal name"
            error={!!errors[FORM_PROJECT_KEYS.internal_name]}
            helperText={errors?.[FORM_PROJECT_KEYS.internal_name]?.message}
            {...register(FORM_PROJECT_KEYS.internal_name)}
          />
          <Input
            variant="outlined"
            label="Description"
            error={!!errors[FORM_PROJECT_KEYS.description]}
            helperText={errors?.[FORM_PROJECT_KEYS.description]?.message}
            {...register(FORM_PROJECT_KEYS.description)}
          />
          <Input
            variant="outlined"
            label="Domain"
            error={!!errors[FORM_PROJECT_KEYS.domain]}
            helperText={errors?.[FORM_PROJECT_KEYS.domain]?.message}
            {...register(FORM_PROJECT_KEYS.domain)}
          />
          <Input
            variant="outlined"
            label="Team size"
            error={!!errors[FORM_PROJECT_KEYS.team_size]}
            helperText={errors?.[FORM_PROJECT_KEYS.team_size]?.message}
            {...register(FORM_PROJECT_KEYS.team_size)}
          />
          <DatePicker label="Start date" name={FORM_PROJECT_KEYS.start_date} control={control} />
          <DatePicker label="End date" name={FORM_PROJECT_KEYS.end_date} control={control} />
          <Button
            type="submit"
            variant="contained"
            loading={updateProjectLoading}
            disabled={!isDirty && !isValid}
          >
            Update project
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
