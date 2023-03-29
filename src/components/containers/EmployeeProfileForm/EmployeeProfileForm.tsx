import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Grid, Typography } from '@mui/material'

import { IDepartmentResult, IPositionResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarUpload } from '@/components/containers/EmployeeAvatarUpload/EmployeeAvatarUpload'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFILE_SCHEMA } from '@/constants/profileSchemaOptions'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { convertCreatedAtDate } from '@/utils/createdAtFormat'

import { IEmployeeProfileFormProps, IProfileFormValues } from './EmployeeProfileForm.interfaces'
import { FORM_KEYS } from './formKeys'

export const EmployeeProfileForm: FC<IEmployeeProfileFormProps> = ({ currentUser }) => {
  const { loading: departmentsLoading, data: departmentsData } =
    useQuery<IDepartmentResult>(DEPARTMENTS)

  const { loading: positionsLoading, data: positionsData } = useQuery<IPositionResult>(POSITIONS)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<IProfileFormValues>({
    defaultValues: {
      [FORM_KEYS.firstName]: currentUser?.profile.first_name || '',
      [FORM_KEYS.lastName]: currentUser?.profile.last_name || '',
      [FORM_KEYS.position]: currentUser?.position?.id || '',
      [FORM_KEYS.department]: currentUser?.department?.id || ''
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
      <Typography>{`A member since ${convertCreatedAtDate(currentUser?.created_at)}`}</Typography>
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
              {...register(FORM_KEYS.firstName)}
            />
            <AppSelect
              variant="outlined"
              label="Department"
              loading={departmentsLoading || positionsLoading}
              items={departmentsData?.departments}
              defaultValue={currentUser?.department?.id || ''}
              error={!!errors.department}
              helperText={errors?.department?.message}
              {...register(FORM_KEYS.department)}
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
              {...register(FORM_KEYS.lastName)}
            />
            <AppSelect
              variant="outlined"
              label="Position"
              loading={departmentsLoading || positionsLoading}
              items={positionsData?.positions}
              defaultValue={currentUser?.position?.id || ''}
              error={!!errors.position}
              helperText={errors?.position?.message}
              {...register(FORM_KEYS.position)}
            />
            <Button
              type="submit"
              variant="contained"
              loading={userLoading}
              disabled={!isDirty && isValid}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
