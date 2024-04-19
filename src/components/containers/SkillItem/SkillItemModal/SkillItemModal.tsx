import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { Container } from '@mui/material'

import { ISkillCategories } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { SKILL_CATEGORIES } from '@/graphql/skill/categories/skillCategoriesQuery'
import { UPDATE_PROFILE_SKILL } from '@/graphql/skill/profile_skill/updateProfileSkill'

import {
  FORM_PROFILE_SKILLS_KEYS,
  IProfileSkillFormValues
} from '../../EmployeeSkillsProfile/SkillsModal/SkillsModal.interfaces'

import { ISkillItemModalProps } from './SkillItemModal.interfaces'

export const SkillItemModal: FC<ISkillItemModalProps> = ({ userData, skillInfo, onClose }) => {
  const { t } = useTranslation()

  const [updateProfileSkill, { loading: profileSkillLoading }] = useMutation(UPDATE_PROFILE_SKILL)
  const { data: skillCategoriesData } = useQuery<ISkillCategories>(SKILL_CATEGORIES)
  const { skill, setSkillInfo } = skillInfo

  const skillsItems = userData?.skills?.map(skillItem => {
    return {
      name: skillItem.name,
      id: skillItem.name
    }
  })

  const skillCategories = skillCategoriesData?.skillCategories.map(categoryItem => {
    return {
      name: categoryItem,
      id: categoryItem
    }
  })

  const {
    handleSubmit,
    register,
    watch,
    formState: { isDirty }
  } = useForm<IProfileSkillFormValues>({
    defaultValues: {
      [FORM_PROFILE_SKILLS_KEYS.skills]: skill?.name,
      [FORM_PROFILE_SKILLS_KEYS.category]: skill?.category,
      [FORM_PROFILE_SKILLS_KEYS.mastery]: skill?.mastery
    },
    mode: 'onSubmit'
  })

  const watchSkill = watch(FORM_PROFILE_SKILLS_KEYS.skills)
  const watchCategory = watch(FORM_PROFILE_SKILLS_KEYS.category)
  const watchMastery = watch(FORM_PROFILE_SKILLS_KEYS.mastery)

  const onSubmit: SubmitHandler<IProfileSkillFormValues> = async formData => {
    await updateProfileSkill({
      variables: {
        skill: {
          userId: userData?.id,
          name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
          mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
        }
      }
    })

    setSkillInfo({
      name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
      category: formData[FORM_PROFILE_SKILLS_KEYS.category],
      mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
    })

    onClose()
  }

  return (
    <ModalWindow onClose={onClose} title="updateSkill">
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppSelect
            value={watchSkill ?? ''}
            variant="outlined"
            label={t('skill')}
            disabled
            items={skillsItems}
            {...register(FORM_PROFILE_SKILLS_KEYS.skills)}
          />
          <AppSelect
            value={watchCategory ?? ''}
            variant="outlined"
            label={t('category')}
            items={skillCategories}
            disabled
            {...register(FORM_PROFILE_SKILLS_KEYS.category)}
          />
          <AppSelect
            variant="outlined"
            value={watchMastery ?? ''}
            label={t('mastery')}
            items={MASTERY_ARRAY}
            {...register(FORM_PROFILE_SKILLS_KEYS.mastery)}
          />
          <Button
            loading={profileSkillLoading}
            type="submit"
            variant="contained"
            disabled={!isDirty}
          >
            {t('update')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
