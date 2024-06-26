import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { DatePicker } from '@/components/views/DatePicker/DatePicker'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROJECT_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CREATE_PROJECT } from '@/graphql/project/createProjectMutation'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { FORM_PROJECT_KEYS, IProjectFormValues } from '@/pages/ProjectsPage/ProjectsPage.interfaces'
import { convertDate } from '@/utils/dateHelper'
import { toastMessage } from '@/utils/toastMessage'

export const ProjectCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createProjectMutation, { loading: createProjectLoading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<IProjectFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROJECT_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IProjectFormValues> = async formData => {
    await createProjectMutation({
      variables: {
        project: {
          name: formData[FORM_PROJECT_KEYS.name],
          internal_name: formData[FORM_PROJECT_KEYS.internal_name],
          description: formData[FORM_PROJECT_KEYS.description],
          domain: formData[FORM_PROJECT_KEYS.domain],
          start_date: convertDate(formData[FORM_PROJECT_KEYS.start_date]),
          end_date: convertDate(formData[FORM_PROJECT_KEYS.end_date]),
          team_size: formData[FORM_PROJECT_KEYS.team_size]
        }
      }
    })

    onClose()

    toastMessage(t('successfullyCreated'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose} title="createProject">
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('name')}
            error={!!errors[FORM_PROJECT_KEYS.name]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.name]?.message as string)}
            {...register(FORM_PROJECT_KEYS.name)}
          />
          <Input
            variant="outlined"
            label={t('internalName')}
            error={!!errors[FORM_PROJECT_KEYS.internal_name]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.internal_name]?.message as string)}
            {...register(FORM_PROJECT_KEYS.internal_name)}
          />
          <Input
            variant="outlined"
            label={t('description')}
            error={!!errors[FORM_PROJECT_KEYS.description]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.description]?.message as string)}
            {...register(FORM_PROJECT_KEYS.description)}
          />
          <Input
            variant="outlined"
            label={t('domain')}
            error={!!errors[FORM_PROJECT_KEYS.domain]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.domain]?.message as string)}
            {...register(FORM_PROJECT_KEYS.domain)}
          />
          <Input
            variant="outlined"
            label={t('teamSize')}
            error={!!errors[FORM_PROJECT_KEYS.team_size]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.team_size]?.message as string)}
            {...register(FORM_PROJECT_KEYS.team_size)}
          />
          <DatePicker label="startDate" name={FORM_PROJECT_KEYS.start_date} control={control} />
          <DatePicker label="endDate" name={FORM_PROJECT_KEYS.end_date} control={control} />
          <Button
            type="submit"
            variant="contained"
            loading={createProjectLoading}
            disabled={!isDirty && isValid}
          >
            {t('create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
