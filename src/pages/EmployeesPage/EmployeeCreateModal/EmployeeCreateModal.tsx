import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IDepartmentResult, IPositionResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { PasswordInput } from '@/components/views/PasswordInput/PasswordInput'
import { AppSelect } from '@/components/views/Select/Select'
import { FORM_EMPLOYEES_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ROLE_ARRAY } from '@/constants/userRoles'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { CREATE_USER } from '@/graphql/user/createUserMutation'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { toastMessage } from '@/utils/toastMessage'

import { FORM_EMPLOYEES_KEYS, IEmployeesFormValues } from '../EmployeesPage.interfaces'

export const EmployeeCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createUserMutation, { loading: createUserLoading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_EMPLOYEES }]
  })

  const { loading: departmentsLoading, data: departmentsData } =
    useQuery<IDepartmentResult>(DEPARTMENTS)

  const { loading: positionsLoading, data: positionsData } = useQuery<IPositionResult>(POSITIONS)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IEmployeesFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_EMPLOYEES_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IEmployeesFormValues> = async formData => {
    await createUserMutation({
      variables: {
        user: {
          auth: {
            email: formData[FORM_EMPLOYEES_KEYS.email],
            password: formData[FORM_EMPLOYEES_KEYS.password]
          },
          profile: {
            first_name: formData[FORM_EMPLOYEES_KEYS.first_name],
            last_name: formData[FORM_EMPLOYEES_KEYS.last_name],
            skills: [],
            languages: []
          },
          departmentId: formData[FORM_EMPLOYEES_KEYS.department],
          positionId: formData[FORM_EMPLOYEES_KEYS.position],
          cvsIds: [],
          role: formData[FORM_EMPLOYEES_KEYS.role]
        }
      }
    })

    onClose()

    toastMessage(t('Successfully created'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('Email')}
            error={!!errors[FORM_EMPLOYEES_KEYS.email]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.email]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.email)}
          />
          <PasswordInput
            label={t('Password')}
            error={!!errors[FORM_EMPLOYEES_KEYS.password]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.password]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.password)}
          />
          <Input
            variant="outlined"
            label={t('First name')}
            error={!!errors[FORM_EMPLOYEES_KEYS.first_name]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.first_name]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.first_name)}
          />
          <Input
            variant="outlined"
            label={t('Last name')}
            error={!!errors[FORM_EMPLOYEES_KEYS.last_name]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.last_name]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.last_name)}
          />
          <AppSelect
            variant="outlined"
            label={t('Department')}
            defaultValue=""
            loading={departmentsLoading}
            items={departmentsData?.departments}
            error={!!errors[FORM_EMPLOYEES_KEYS.department]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.department]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.department)}
          />
          <AppSelect
            variant="outlined"
            label={t('Position')}
            defaultValue=""
            loading={positionsLoading}
            items={positionsData?.positions}
            error={!!errors[FORM_EMPLOYEES_KEYS.position]}
            helperText={t(errors?.[FORM_EMPLOYEES_KEYS.position]?.message as string)}
            {...register(FORM_EMPLOYEES_KEYS.position)}
          />
          <AppSelect
            variant="outlined"
            label={t('Role')}
            defaultValue=""
            items={ROLE_ARRAY}
            error={!!errors[FORM_EMPLOYEES_KEYS.role]}
            helperText={errors?.[FORM_EMPLOYEES_KEYS.role]?.message}
            {...register(FORM_EMPLOYEES_KEYS.role)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createUserLoading}
            disabled={!isDirty && isValid}
          >
            {t('Create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
