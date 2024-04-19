import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { ISkillCategories, ISkillsResult } from '@/appTypes/IResult.interfaces'
import {
  FORM_PROFILE_SKILLS_KEYS,
  IProfileSkillFormValues
} from '@/components/containers/EmployeeSkillsProfile/SkillsModal/SkillsModal.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { FORM_PROFILE_SKILLS_SCHEMA } from '@/constants/schemaOptions'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ADD_CV_SKILL } from '@/graphql/cv/cvSkills/addCvSkillsMutation'
import { SKILL_CATEGORIES } from '@/graphql/skill/categories/skillCategoriesQuery'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { toastMessage } from '@/utils/toastMessage'

import { ICVSkillsModalProps } from './CVSkillsModal.interfaces'

export const CVSkillsModal: FC<ICVSkillsModalProps> = ({ cv, onClose }) => {
  const { loading: loadingSkills, data: skillsData } = useQuery<ISkillsResult>(SKILLS)
  const { loading: loadingSkillCategories, data: skillCategoriesData } =
    useQuery<ISkillCategories>(SKILL_CATEGORIES)

  const [addCvSkill, { loading: userLoading }] = useMutation(ADD_CV_SKILL)

  const { t } = useTranslation()

  const skillsNameArray = cv.skills.map(item => item.name)
  const filteredSkillsArray = skillsData?.skills
    .filter(element => !skillsNameArray?.includes(element.name))
    .map(skill => {
      return {
        name: skill.name,
        id: skill.name
      }
    })

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
    formState: { errors, isSubmitSuccessful, isValid },
    watch,
    setValue
  } = useForm<IProfileSkillFormValues>({
    defaultValues: {
      [FORM_PROFILE_SKILLS_KEYS.skills]: '',
      [FORM_PROFILE_SKILLS_KEYS.mastery]: ''
    },
    mode: 'onSubmit',
    resolver: yupResolver(FORM_PROFILE_SKILLS_SCHEMA)
  })

  const watchSkill = watch(FORM_PROFILE_SKILLS_KEYS.skills)
  const watchCategory = watch(FORM_PROFILE_SKILLS_KEYS.category)

  const onSubmit: SubmitHandler<IProfileSkillFormValues> = async formData => {
    await addCvSkill({
      variables: {
        skill: {
          cvId: cv.id,
          name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
          category: watchSkill ? watchCategory : '',
          mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
        }
      }
    })

    onClose()

    toastMessage(t('successfullyAdded'), TOAST_TYPES.success)
  }

  useEffect(() => {
    const skill = skillsData?.skills.find(skillItem => {
      return skillItem.name === watchSkill
    })

    if (skill) setValue(FORM_PROFILE_SKILLS_KEYS.category, skill?.category)
  }, [watchSkill, skillsData?.skills])

  useEffect(() => {
    reset({
      [FORM_PROFILE_SKILLS_KEYS.skills]: '',
      [FORM_PROFILE_SKILLS_KEYS.mastery]: ''
    })
  }, [isSubmitSuccessful])

  return (
    <ModalWindow onClose={onClose} title="addSkill">
      <Container sx={{ minWidth: '500px' }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <AppSelect
            variant="outlined"
            label={t('skill')}
            loading={loadingSkills}
            items={filteredSkillsArray}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.skills]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.skills]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.skills)}
            onChange={e => setValue(FORM_PROFILE_SKILLS_KEYS.skills, e.target.value)}
          />
          <AppSelect
            value={watchCategory ?? ''}
            variant="outlined"
            label={t('category')}
            disabled
            items={skillCategories}
            loading={loadingSkillCategories}
            {...register(FORM_PROFILE_SKILLS_KEYS.category)}
          />
          <AppSelect
            variant="outlined"
            label={t('mastery')}
            disabled={!!!watchSkill}
            items={MASTERY_ARRAY}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.mastery]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.mastery]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.mastery)}
          />
          <Button loading={userLoading} type="submit" variant="contained" disabled={!isValid}>
            {t('save')}
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
