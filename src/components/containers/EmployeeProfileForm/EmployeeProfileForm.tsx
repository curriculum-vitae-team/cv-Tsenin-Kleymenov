import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, Grid, Typography } from '@mui/material'

import { IDepartmentResult, IPositionResult } from '@/appTypes/IResult.interfaces'
import { EmployeeAvatarUpload } from '@/components/containers/EmployeeAvatarUpload/EmployeeAvatarUpload'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { Loader } from '@/components/views/Loader/Loader'
import { AppSelect } from '@/components/views/Select/Select'
import { FORM_PROFILE_SCHEMA } from '@/constants/schemaOptions'
import { authService } from '@/graphql/auth/authService'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { convertCreatedAtDate } from '@/utils/createdAtFormat'

import {
  FORM_PROFILE_KEYS,
  IEmployeeProfileFormProps,
  IProfileFormValues
} from './EmployeeProfileForm.interfaces'

export const EmployeeProfileForm: FC<IEmployeeProfileFormProps> = ({ currentUser }) => {
  const user = useReactiveVar(authService.user$)
  const userCheck = currentUser?.id === user?.id
  const { loading: departmentsLoading, data: departmentsData } =
    useQuery<IDepartmentResult>(DEPARTMENTS)

  const { loading: positionsLoading, data: positionsData } = useQuery<IPositionResult>(POSITIONS)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: currentUser?.id } }]
  })

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
      <Box sx={{ minHeight: 150 }}>
        {userLoading ? (
          <Box sx={{ position: 'relative' }}>
            <Loader color="primary" />
          </Box>
        ) : (
          <>
            <Typography>{currentUser?.profile.full_name}</Typography>
            <Typography>{currentUser?.email}</Typography>
            <Typography>{`Department: ${currentUser?.department_name || '-'}`}</Typography>
            <Typography>{`Position: ${currentUser?.position_name || '-'}`}</Typography>
            <Typography>{`A member since ${convertCreatedAtDate(
              currentUser?.created_at
            )}`}</Typography>
          </>
        )}
      </Box>
      {userCheck && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                type="text"
                variant="outlined"
                label="First Name"
                placeholder=" Enter your First Name"
                error={!!errors[FORM_PROFILE_KEYS.firstName]}
                helperText={errors?.[FORM_PROFILE_KEYS.firstName]?.message}
                {...register(FORM_PROFILE_KEYS.firstName)}
              />
              <AppSelect
                variant="outlined"
                label="Department"
                defaultValue={''}
                loading={departmentsLoading}
                items={departmentsData?.departments}
                error={!!errors[FORM_PROFILE_KEYS.department]}
                helperText={errors?.[FORM_PROFILE_KEYS.department]?.message}
                {...register(FORM_PROFILE_KEYS.department)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                type="text"
                variant="outlined"
                label="Last Name"
                placeholder="Enter your Last Name"
                error={!!errors[FORM_PROFILE_KEYS.lastName]}
                helperText={errors?.[FORM_PROFILE_KEYS.lastName]?.message}
                {...register(FORM_PROFILE_KEYS.lastName)}
              />
              <AppSelect
                variant="outlined"
                label="Position"
                defaultValue={''}
                loading={positionsLoading}
                items={positionsData?.positions}
                error={!!errors[FORM_PROFILE_KEYS.position]}
                helperText={errors?.[FORM_PROFILE_KEYS.position]?.message}
                {...register(FORM_PROFILE_KEYS.position)}
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
      )}
    </Container>
  )
}
