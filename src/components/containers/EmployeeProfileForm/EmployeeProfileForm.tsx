import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Grid, Typography } from '@mui/material'

import { ProfileSchema } from '../../../constants/profileSchemaOptions'
import { Button } from '../../views/Button/Button'
import { Input } from '../../views/Input/Input'
import { AppSelect } from '../../views/Select/Select'

import { IFormValues } from './EmployeeProfileForm.interfaces'

export const EmployeeProfile: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<IFormValues>({ mode: 'onBlur', resolver: yupResolver(ProfileSchema) })

  const onSubmit: SubmitHandler<IFormValues> = data => {
    console.log(data)
  }

  return (
    <Container maxWidth="md">
      <Typography>Arthur Tsenin</Typography>
      <Typography>dgdgdgdggdgd.@gmail.com</Typography>
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
              label="Departmant"
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
