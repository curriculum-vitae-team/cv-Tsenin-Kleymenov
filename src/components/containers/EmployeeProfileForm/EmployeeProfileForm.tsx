import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Grid, Typography } from '@mui/material'

import { EmployeeAvatarUpload } from '@/components/containers/EmployeeAvatarUpload/EmployeeAvatarUpload'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFILE_SCHEMA } from '@/constants/profileSchemaOptions'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'

import { IEmployeeProfileFormProps, IProfileFormValues } from './EmployeeProfileForm.interfaces'

export const EmployeeProfileForm: FC<IEmployeeProfileFormProps> = ({
  currentUser,
  departments,
  positions
}) => {
  const [updateUser] = useMutation(UPDATE_USER)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<IProfileFormValues>({
    defaultValues: {
      firstName: currentUser?.profile.first_name || '',
      lastName: currentUser?.profile.last_name || '',
      position: currentUser?.position?.id || '',
      department: currentUser?.department?.id || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(PROFILE_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileFormValues> = async formData => {
    await updateUser({
      variables: {
        id: currentUser?.id,
        user: {
          profile: {
            first_name: formData.firstName,
            last_name: formData.lastName
          },
          departmentId: formData.department,
          positionId: formData.position
        }
      }
    })
  }

  return (
    <Container maxWidth="md">
      <EmployeeAvatarUpload />
      <Typography>{currentUser?.profile.full_name}</Typography>
      <Typography>{currentUser?.email}</Typography>
      <Typography>{currentUser?.created_at}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              type="text"
              label="First Name"
              placeholder=" Enter your First Name"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              {...register('firstName')}
            />
            <AppSelect
              variant="outlined"
              label="Department"
              items={departments}
              defaultValue={currentUser?.department?.id || ''}
              error={!!errors.department}
              helperText={errors?.department?.message}
              {...register('department')}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              variant="outlined"
              type="text"
              label="Last Name"
              placeholder="Enter your Last Name"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              {...register('lastName')}
            />
            <AppSelect
              variant="outlined"
              label="Position"
              items={positions}
              defaultValue={currentUser?.position?.id || ''}
              error={!!errors.position}
              helperText={errors?.position?.message}
              {...register('position')}
            />
            <Button type="submit" variant="contained" disabled={!isDirty && isValid}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
