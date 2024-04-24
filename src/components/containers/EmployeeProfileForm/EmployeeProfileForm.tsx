import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'

import { IDepartmentResult, IPositionResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarUpload } from '@/components/containers/EmployeeAvatarUpload/EmployeeAvatarUpload'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { RowInfo } from '@/components/views/RowInfo/RowInfo'
import { AppSelect } from '@/components/views/Select/Select'
import { FORM_PROFILE_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { UPDATE_PROFILE } from '@/graphql/profile/updateProfileMutation'
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

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: () => [{ query: USER, variables: { id: currentUser?.id } }]
  })

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid }
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

  const watchDepartment = watch(FORM_PROFILE_KEYS.department)
  const watchPosition = watch(FORM_PROFILE_KEYS.position)

  const onSubmit: SubmitHandler<IProfileFormValues> = async formData => {
    await updateUser({
      variables: {
        user: {
          userId: currentUser?.id,
          cvsIds: currentUser?.cvs?.map(cv => cv.id) ?? [],
          departmentId: formData[FORM_PROFILE_KEYS.department],
          positionId: formData[FORM_PROFILE_KEYS.position],
          role: currentUser?.role
        }
      }
    })

    await updateProfile({
      variables: {
        profile: {
          userId: currentUser?.id,
          first_name: formData[FORM_PROFILE_KEYS.firstName],
          last_name: formData[FORM_PROFILE_KEYS.lastName]
        }
      }
    })

    reset({
      [FORM_PROFILE_KEYS.firstName]: formData[FORM_PROFILE_KEYS.firstName],
      [FORM_PROFILE_KEYS.lastName]: formData[FORM_PROFILE_KEYS.lastName],
      [FORM_PROFILE_KEYS.position]: formData[FORM_PROFILE_KEYS.position],
      [FORM_PROFILE_KEYS.department]: formData[FORM_PROFILE_KEYS.department]
    })

    toastMessage(t('successfullyUpdated'), TOAST_TYPES.success)
  }

  return (
    <>
      <EmployeeAvatarUpload />
      <Box sx={{ margin: '20px 0' }}>
        <LoadingOverlay active={userLoading}>
          <RowInfo title="email" info={currentUser?.email} />
          <RowInfo title="memberSince" info={convertCreatedAtDate(currentUser?.created_at)} />
        </LoadingOverlay>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              type="text"
              variant="outlined"
              label={t('firstName')}
              placeholder={t('enterFirstName') as string}
              error={!!errors[FORM_PROFILE_KEYS.firstName]}
              helperText={t(errors?.[FORM_PROFILE_KEYS.firstName]?.message as string)}
              {...register(FORM_PROFILE_KEYS.firstName)}
            />
            <AppSelect
              variant="outlined"
              value={watchDepartment}
              label={t('department')}
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
              label={t('lastName')}
              placeholder={t('enterLastName') as string}
              error={!!errors[FORM_PROFILE_KEYS.lastName]}
              helperText={t(errors?.[FORM_PROFILE_KEYS.lastName]?.message as string)}
              {...register(FORM_PROFILE_KEYS.lastName)}
            />
            <AppSelect
              variant="outlined"
              value={watchPosition}
              label={t('position')}
              loading={positionsLoading}
              items={positionsData?.positions}
              error={!!errors[FORM_PROFILE_KEYS.position]}
              helperText={t(errors?.[FORM_PROFILE_KEYS.position]?.message as string)}
              {...register(FORM_PROFILE_KEYS.position)}
            />
            {(userCheck || isAdmin) && (
              <Button
                type="submit"
                variant="contained"
                loading={userLoading}
                disabled={!isDirty && isValid}
              >
                {t('confirm')}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  )
}
