import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { ISkillCategories, ISkillsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { FORM_PROFILE_SKILLS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { SKILL_CATEGORIES } from '@/graphql/skill/categories/skillCategoriesQuery'
import { ADD_PROFILE_SKILL } from '@/graphql/skill/profile_skill/addProfileSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { toastMessage } from '@/utils/toastMessage'

import {
  FORM_PROFILE_SKILLS_KEYS,
  IProfileSkillFormValues,
  ISkillsModalProps
} from './SkillsModal.interfaces'

export const SkillsModal: FC<ISkillsModalProps> = ({ userData, onClose }) => {
  const { loading: loadingSkills, data: skillsData } = useQuery<ISkillsResult>(SKILLS)
  const { loading: loadingSkillCategories, data: skillCategoriesData } =
    useQuery<ISkillCategories>(SKILL_CATEGORIES)

  const [category, setCategory] = useState<string>('')
  const [selectedSkill, setSelectedSkill] = useState<string>('')

  const [addProfileSkill, { loading: userLoading }] = useMutation(ADD_PROFILE_SKILL)

  const { t } = useTranslation()

  const skillsNameArray = userData?.profile.skills.map(item => item.name)
  const filteredSkillsArray = skillsData?.skills
    .filter(element => !skillsNameArray?.includes(element.name))
    .map(skill => {
      return {
        name: skill.name,
        id: skill.name
      }
    })

  useEffect(() => {
    const skill = skillsData?.skills.find(skillItem => {
      return skillItem.name === selectedSkill
    })

    if (skill) setCategory(skill?.category || '')
  }, [selectedSkill, skillsData?.skills])

  const skillCategories = skillCategoriesData?.skillCategories.map(categoryItem => {
    return {
      name: categoryItem,
      id: categoryItem
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isValid }
  } = useForm<IProfileSkillFormValues>({
    defaultValues: {
      [FORM_PROFILE_SKILLS_KEYS.skills]: '',
      [FORM_PROFILE_SKILLS_KEYS.mastery]: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_SKILLS_SCHEMA)
  })

  const onSubmit: SubmitHandler<IProfileSkillFormValues> = async formData => {
    await addProfileSkill({
      variables: {
        skill: {
          userId: userData?.id,
          name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
          category: selectedSkill ? category : '',
          mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
        }
      }
    })

    onClose()

    toastMessage(t('Successfully added'), TOAST_TYPES.success)
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_SKILLS_KEYS.skills]: '',
      [FORM_PROFILE_SKILLS_KEYS.mastery]: ''
    })
  }, [isSubmitSuccessful])

  return (
    <ModalWindow onClose={onClose}>
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <AppSelect
            variant="outlined"
            label={t('Skills')}
            defaultValue=""
            loading={loadingSkills}
            items={filteredSkillsArray}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.skills]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.skills]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.skills)}
            onChange={e => setSelectedSkill(e.target.value)}
          />
          <AppSelect
            value={category}
            variant="outlined"
            label={t('Category')}
            disabled
            items={skillCategories}
            loading={loadingSkillCategories}
            {...register(FORM_PROFILE_SKILLS_KEYS.category)}
          />
          <AppSelect
            variant="outlined"
            label={t('Mastery')}
            disabled={!!!selectedSkill}
            defaultValue=""
            items={MASTERY_ARRAY}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.mastery]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.mastery]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.mastery)}
          />
          <Button loading={userLoading} type="submit" variant="contained" disabled={!isValid}>
            {t('Save')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
