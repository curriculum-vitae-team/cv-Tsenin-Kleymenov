import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_SKILL_SCHEMA } from '@/constants/schemaOptions'
import { CREATE_SKILL } from '@/graphql/skills/createSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'

import { FORM_SKILL_KEYS, ISkillFormValues } from '../SkillsPage.interfaces'

export const SkillCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createSkillMutation, { loading: createSkillLoading }] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ISkillFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_SKILL_SCHEMA)
  })

  const onSubmit: SubmitHandler<ISkillFormValues> = async formData => {
    await createSkillMutation({
      variables: {
        skill: {
          name: formData[FORM_SKILL_KEYS.name]
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
            label="Name"
            error={!!errors[FORM_SKILL_KEYS.name]}
            helperText={errors?.[FORM_SKILL_KEYS.name]?.message}
            {...register(FORM_SKILL_KEYS.name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createSkillLoading}
            disabled={!isDirty && isValid}
          >
            Create skill
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
