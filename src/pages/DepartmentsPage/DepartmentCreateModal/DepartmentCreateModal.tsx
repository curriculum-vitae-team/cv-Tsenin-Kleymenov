import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_DEPARTMENT_SCHEMA } from '@/constants/schemaOptions'
import { CREATE_DEPARTMENT } from '@/graphql/departments/createDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import {
  FORM_DEPARTMENT_KEYS,
  IDepartmentFormValues
} from '@/pages/DepartmentsPage/DepartmentsPage.interfaces'

export const DepartmentCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const [createDepartmentMutation, { loading: createDepartmentLoading }] = useMutation(
    CREATE_DEPARTMENT,
    {
      refetchQueries: [{ query: DEPARTMENTS }]
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IDepartmentFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_DEPARTMENT_SCHEMA)
  })

  const onSubmit: SubmitHandler<IDepartmentFormValues> = async formData => {
    await createDepartmentMutation({
      variables: {
        department: {
          name: formData[FORM_DEPARTMENT_KEYS.name]
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
            error={!!errors[FORM_DEPARTMENT_KEYS.name]}
            helperText={t(errors?.[FORM_DEPARTMENT_KEYS.name]?.message as string)}
            {...register(FORM_DEPARTMENT_KEYS.name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createDepartmentLoading}
            disabled={!isDirty && isValid}
          >
            {t('Create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
