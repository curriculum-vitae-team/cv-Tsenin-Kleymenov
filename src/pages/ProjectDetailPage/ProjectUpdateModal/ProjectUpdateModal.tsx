import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'
import dayjs from 'dayjs'

import { Button } from '@/components/views/Button/Button'
import { DatePicker } from '@/components/views/DatePicker/DatePicker'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_PROJECT_SCHEMA } from '@/constants/schemaOptions'
import { UPDATE_PROJECT } from '@/graphql/project/updateProjectMutation'
import { FORM_PROJECT_KEYS, IProjectFormValues } from '@/pages/ProjectsPage/ProjectsPage.interfaces'
import { convertDate } from '@/utils/convertDate'

import { IProjectUpdateModalProps } from './ProjectUpdateModal.interfaces'

export const ProjectUpdateModal: FC<IProjectUpdateModalProps> = ({ project, onClose }) => {
  const { t } = useTranslation()
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
      [FORM_PROJECT_KEYS.start_date]: dayjs(project?.project?.start_date).format(),
      [FORM_PROJECT_KEYS.end_date]: dayjs(project?.project?.end_date).format(),
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
            label={t('Name')}
            error={!!errors[FORM_PROJECT_KEYS.name]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.name]?.message as string)}
            {...register(FORM_PROJECT_KEYS.name)}
          />
          <Input
            variant="outlined"
            label={t('Internal name')}
            error={!!errors[FORM_PROJECT_KEYS.internal_name]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.internal_name]?.message as string)}
            {...register(FORM_PROJECT_KEYS.internal_name)}
          />
          <Input
            variant="outlined"
            label={t('Description')}
            error={!!errors[FORM_PROJECT_KEYS.description]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.description]?.message as string)}
            {...register(FORM_PROJECT_KEYS.description)}
          />
          <Input
            variant="outlined"
            label={t('Domain')}
            error={!!errors[FORM_PROJECT_KEYS.domain]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.domain]?.message as string)}
            {...register(FORM_PROJECT_KEYS.domain)}
          />
          <Input
            variant="outlined"
            label={t('Team size')}
            error={!!errors[FORM_PROJECT_KEYS.team_size]}
            helperText={t(errors?.[FORM_PROJECT_KEYS.team_size]?.message as string)}
            {...register(FORM_PROJECT_KEYS.team_size)}
          />
          <DatePicker label="Start date" name={FORM_PROJECT_KEYS.start_date} control={control} />
          <DatePicker label="End date" name={FORM_PROJECT_KEYS.end_date} control={control} />
          <Button
            type="submit"
            variant="contained"
            loading={updateProjectLoading}
            disabled={!isDirty && isValid}
          >
            {t('Update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
