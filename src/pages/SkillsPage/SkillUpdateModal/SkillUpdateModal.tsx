import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { FORM_SKILL_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { UPDATE_SKILL } from '@/graphql/skill/updateSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { FORM_SKILL_KEYS, ISkillFormValues } from '@/pages/SkillsPage/SkillsPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

import { ISkillUpdateModalProps } from './SkillUpdateModal.interfaces'

export const SkillUpdateModal: FC<ISkillUpdateModalProps> = ({ skill, onClose }) => {
  const [updateSkillMutation, { loading: updateSkillLoading }] = useMutation(UPDATE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<ISkillFormValues>({
    defaultValues: {
      [FORM_SKILL_KEYS.name]: skill?.name || ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_SKILL_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<ISkillFormValues> = async formData => {
    await updateSkillMutation({
      variables: {
        id: skill?.id,
        skill: {
          name: formData[FORM_SKILL_KEYS.name]
        }
      }
    })

    onClose()

    toastMessage(t('Successfully updated'), TOAST_TYPES.success)
  }

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('Name')}
            error={!!errors[FORM_SKILL_KEYS.name]}
            helperText={t(errors?.[FORM_SKILL_KEYS.name]?.message as string)}
            {...register(FORM_SKILL_KEYS.name)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={updateSkillLoading}
            disabled={!isDirty && isValid}
          >
            {t('Update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
