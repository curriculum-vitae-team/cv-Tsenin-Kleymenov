import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ISkillCategories } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Input } from '@/components/views/Input/Input'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { FORM_SKILL_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { SKILL_CATEGORIES } from '@/graphql/skill/categories/skillCategoriesQuery'
import { CREATE_SKILL } from '@/graphql/skill/createSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { FORM_SKILL_KEYS, ISkillFormValues } from '@/pages/SkillsPage/SkillsPage.interfaces'
import { toastMessage } from '@/utils/toastMessage'

export const SkillCreateModal: FC<IBaseModalProps> = ({ onClose }) => {
  const [createSkillMutation, { loading: createSkillLoading }] = useMutation(CREATE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })
  const { loading: loadingSkillCategories, data: skillCategoriesData } =
    useQuery<ISkillCategories>(SKILL_CATEGORIES)

  const skillCategories = skillCategoriesData?.skillCategories.map(categoryItem => {
    return {
      name: categoryItem,
      id: categoryItem
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch
  } = useForm<ISkillFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(FORM_SKILL_SCHEMA)
  })

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<ISkillFormValues> = async formData => {
    await createSkillMutation({
      variables: {
        skill: {
          name: formData[FORM_SKILL_KEYS.name],
          category: formData[FORM_SKILL_KEYS.category]
        }
      }
    })

    onClose()

    toastMessage(t('successfullyCreated'), TOAST_TYPES.success)
  }

  const watchCategory = watch(FORM_SKILL_KEYS.category)

  return (
    <ModalWindow onClose={onClose} title="createSkill">
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Input
            variant="outlined"
            label={t('name')}
            error={!!errors[FORM_SKILL_KEYS.name]}
            helperText={t(errors?.[FORM_SKILL_KEYS.name]?.message as string)}
            {...register(FORM_SKILL_KEYS.name)}
          />
          <AppSelect
            variant="outlined"
            label={t('category')}
            value={watchCategory ?? ''}
            error={!!errors[FORM_SKILL_KEYS.category]}
            items={skillCategories}
            loading={loadingSkillCategories}
            helperText={t(errors?.[FORM_SKILL_KEYS.category]?.message as string)}
            {...register(FORM_SKILL_KEYS.category)}
          />
          <Button
            type="submit"
            variant="contained"
            loading={createSkillLoading}
            disabled={!isDirty && isValid}
          >
            {t('create')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
