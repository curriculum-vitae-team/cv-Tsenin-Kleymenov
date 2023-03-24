import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Grid, Typography } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { AppSelect } from '@/components/views/Select/Select'
import { PROFILE_SCHEMA } from '@/constants/profileSchemaOptions'

import { IFormValues } from './EmployeeProfileForm.interfaces'

export const EmployeeProfile: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<IFormValues>({ mode: 'onBlur', resolver: yupResolver(PROFILE_SCHEMA) })

  const onSubmit: SubmitHandler<IFormValues> = data => {
    console.log(data)
  }

  return (
    <Container maxWidth="md">
      <Typography>User</Typography>
      <Typography>userEmail.@/gmail.com</Typography>
      <Typography>23/12/2022</Typography>
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
              items={['Unit 1(JavaScript)', 'Unit 2(Java)', 'Unit 3(Python)']}
              label="Department"
              variant="standard"
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
              placeholder=" Enter your Last Name"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              {...register('lastName')}
            />

            <AppSelect
              items={['Unit 1(JavaScript)', 'Unit 2(Java)', 'Unit 3(Python)']}
              label="Position"
              variant="outlined"
              error={!!errors.position}
              helperText={errors?.position?.message}
              {...register('position')}
            />
            <Button type="submit" variant="contained" disabled={!isDirty && !isValid}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
