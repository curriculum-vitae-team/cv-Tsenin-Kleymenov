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
import { FORM_POSITION_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { CREATE_POSITION } from '@/graphql/position/createPositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import {
  FORM_POSITION_KEYS,
  IPositionFormValues
} from '@/pages/PositionsPage/PositionsPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

export const PositionCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createPositionMutation, { loading: createPositionLoading }] = useMutation(
    CREATE_POSITION,
    {
      refetchQueries: [{ query: POSITIONS }]
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<IPositionFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_POSITION_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IPositionFormValues> = async formData => {
    await createPositionMutation({
      variables: {
        position: {
          name: formData[FORM_POSITION_KEYS.name]
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
            label={t('Name')}
            error={!!errors[FORM_POSITION_KEYS.name]}
            helperText={t(errors?.[FORM_POSITION_KEYS.name]?.message as string)}
            {...register(FORM_POSITION_KEYS.name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createPositionLoading}
            disabled={!isDirty && isValid}
          >
            {t('Create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
