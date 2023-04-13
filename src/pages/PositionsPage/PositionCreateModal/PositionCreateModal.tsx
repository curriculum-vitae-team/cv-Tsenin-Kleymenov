import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_POSITION_SCHEMA } from '@/constants/schemaOptions'
import { CREATE_POSITION } from '@/graphql/positions/createPositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import {
  FORM_POSITION_KEYS,
  IPositionFormValues
} from '@/pages/PositionsPage/PositionsPage.interfaces'

export const PositionCreateModal: FC<IBaseModalProps> = ({ onClose: handleClose }) => {
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

  const onSubmit: SubmitHandler<IPositionFormValues> = async formData => {
    await createPositionMutation({
      variables: {
        position: {
          name: formData[FORM_POSITION_KEYS.name]
        }
      }
    })
    handleClose()
  }

  return (
    <ModalWindow onClose={handleClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label="Name"
            error={!!errors[FORM_POSITION_KEYS.name]}
            helperText={errors?.[FORM_POSITION_KEYS.name]?.message}
            {...register(FORM_POSITION_KEYS.name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createPositionLoading}
            disabled={!isDirty && isValid}
          >
            Create position
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
