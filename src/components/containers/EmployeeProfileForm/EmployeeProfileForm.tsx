import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, Grid, Typography } from '@mui/material'

import { IDepartmentResult, IPositionResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarUpload } from '@/components/containers/EmployeeAvatarUpload/EmployeeAvatarUpload'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { AppSelect } from '@/components/views/Select/Select'
import { FORM_PROFILE_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { useUser } from '@/hooks/useUser'
import { convertCreatedAtDate } from '@/utils/createdAtFormat'
import { toastMessage } from '@/utils/toastMessage'

import {
  FORM_PROFILE_KEYS,
  IEmployeeProfileFormProps,
  IProfileFormValues
} from './EmployeeProfileForm.interfaces'

export const EmployeeProfileForm: FC<IEmployeeProfileFormProps> = ({ currentUser }) => {
  const { user, isAdmin } = useUser()
  const userCheck = currentUser?.id === user?.id

  const { loading: departmentsLoading, data: departmentsData } =
    useQuery<IDepartmentResult>(DEPARTMENTS)

  const { loading: positionsLoading, data: positionsData } = useQuery<IPositionResult>(POSITIONS)

  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: currentUser?.id } }]
  })

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitSuccessful }
  } = useForm<IProfileFormValues>({
    defaultValues: {
      [FORM_PROFILE_KEYS.firstName]: currentUser?.profile.first_name || '',
      [FORM_PROFILE_KEYS.lastName]: currentUser?.profile.last_name || '',
      [FORM_PROFILE_KEYS.position]: currentUser?.position?.id || '',
      [FORM_PROFILE_KEYS.department]: currentUser?.department?.id || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileFormValues> = async formData => {
    await updateUser({
      variables: {
        id: currentUser?.id,
        user: {
          profile: {
            first_name: formData[FORM_PROFILE_KEYS.firstName],
            last_name: formData[FORM_PROFILE_KEYS.lastName]
          },
          departmentId: formData[FORM_PROFILE_KEYS.department],
          positionId: formData[FORM_PROFILE_KEYS.position]
        }
      }
    })

    toastMessage(t('Successfully updated'), TOAST_TYPES.success)
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_KEYS.position]: currentUser?.position?.id,
      [FORM_PROFILE_KEYS.department]: currentUser?.department?.id
    })
  }, [isSubmitSuccessful])

  return (
    <Container maxWidth="md">
      <EmployeeAvatarUpload />
      <Box sx={{ minHeight: 150, marginTop: '20px' }}>
        <LoadingOverlay active={userLoading}>
          <Typography>{`${t('Full name')}: ${currentUser?.profile.full_name || '-'}`}</Typography>
          <Typography>{`${t('Email')}: ${currentUser?.email || '-'}`}</Typography>
          <Typography>{`${t('Department')}: ${currentUser?.department_name || '-'}`}</Typography>
          <Typography>{`${t('Position')}: ${currentUser?.position_name || '-'}`}</Typography>
          <Typography>{`${t('A member since')}: ${convertCreatedAtDate(
            currentUser?.created_at
          )}`}</Typography>
        </LoadingOverlay>
      </Box>
      {(userCheck || isAdmin) && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                type="text"
                variant="outlined"
                label={t('First name')}
                placeholder={t('Enter your first name') as string}
                error={!!errors[FORM_PROFILE_KEYS.firstName]}
                helperText={t(errors?.[FORM_PROFILE_KEYS.firstName]?.message as string)}
                {...register(FORM_PROFILE_KEYS.firstName)}
              />
              <AppSelect
                variant="outlined"
                label={t('Department')}
                defaultValue={''}
                loading={departmentsLoading}
                items={departmentsData?.departments}
                error={!!errors[FORM_PROFILE_KEYS.department]}
                helperText={t(errors?.[FORM_PROFILE_KEYS.department]?.message as string)}
                {...register(FORM_PROFILE_KEYS.department)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="text"
                variant="outlined"
                label={t('Last name')}
                placeholder={t('Enter your last name') as string}
                error={!!errors[FORM_PROFILE_KEYS.lastName]}
                helperText={t(errors?.[FORM_PROFILE_KEYS.lastName]?.message as string)}
                {...register(FORM_PROFILE_KEYS.lastName)}
              />
              <AppSelect
                variant="outlined"
                label={t('Position')}
                defaultValue={''}
                loading={positionsLoading}
                items={positionsData?.positions}
                error={!!errors[FORM_PROFILE_KEYS.position]}
                helperText={t(errors?.[FORM_PROFILE_KEYS.position]?.message as string)}
                {...register(FORM_PROFILE_KEYS.position)}
              />
              <Button
                type="submit"
                variant="contained"
                loading={userLoading}
                disabled={!isDirty && isValid}
              >
                {t('Confirm')}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  )
}
