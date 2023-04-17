import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_DEPARTMENT_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { UPDATE_DEPARTMENT } from '@/graphql/departments/updateDepartmentMutation'
import {
  FORM_DEPARTMENT_KEYS,
  IDepartmentFormValues
} from '@/pages/DepartmentsPage/DepartmentsPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

import { IDepartmentUpdateModalProps } from './DepartmentUpdateModal.interfaces'

export const DepartmentUpdateModal: FC<IDepartmentUpdateModalProps> = ({ department, onClose }) => {
  const { t } = useTranslation()
  const [updateUpdateMutation, { loading: updateUpdateLoading }] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IDepartmentFormValues>({
    defaultValues: {
      [FORM_DEPARTMENT_KEYS.name]: department?.name || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_DEPARTMENT_SCHEMA)
  })

  const onSubmit: SubmitHandler<IDepartmentFormValues> = async formData => {
    await updateUpdateMutation({
      variables: {
        id: department?.id,
        department: {
          name: formData[FORM_DEPARTMENT_KEYS.name]
        }
      }
    })

    onClose()

    toastMessage('Successfully updated', TOAST_TYPES.success)
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
            loading={updateUpdateLoading}
            disabled={!isDirty && isValid}
          >
            {t('Update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
