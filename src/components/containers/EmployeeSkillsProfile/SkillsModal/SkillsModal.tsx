import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@mui/material'

import { ISkillsResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { ModalWindow } from '@/components/views/ModalWindow/ModalWindow'
import { AppSelect } from '@/components/views/Select/Select'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { FORM_PROFILE_SKILLS_SCHEMA } from '@/constants/schemaOptions'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { createSkillsArray } from '@/utils/createSkillsArray'

import {
  FORM_PROFILE_SKILLS_KEYS,
  IProfileSkillFormValues,
  ISkillsModalProps
} from './SkillsModal.interfaces'

export const SkillsModal: FC<ISkillsModalProps> = ({ userData, onClose }) => {
  const { t } = useTranslation()
  const { loading: loadingSkills, data: skillsData } = useQuery<ISkillsResult>(SKILLS)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER)

  const skillsNameArray = userData?.profile.skills.map(item => item.skill_name)
  const filteredSkillsArray = skillsData?.skills
    .filter(element => !skillsNameArray?.includes(element.name))
    .map(skill => {
      return {
        name: skill.name,
        id: skill.name
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
    await updateUser({
      variables: {
        id: userData?.id,
        user: {
          profile: {
            first_name: userData?.profile.first_name || '',
            last_name: userData?.profile.last_name || '',
            skills: [
              {
                skill_name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
                mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
              },
              ...createSkillsArray(userData?.profile.skills)
            ]
          },
          departmentId: userData?.department?.id || '',
          positionId: userData?.position?.id || ''
        }
      }
    })

    onClose()
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
            defaultValue={''}
            loading={loadingSkills}
            items={filteredSkillsArray}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.skills]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.skills]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.skills)}
          />
          <AppSelect
            variant="outlined"
            label={t('Mastery')}
            defaultValue={''}
            items={MASTERY_ARRAY}
            error={!!errors[FORM_PROFILE_SKILLS_KEYS.mastery]}
            helperText={t(errors?.[FORM_PROFILE_SKILLS_KEYS.mastery]?.message as string)}
            {...register(FORM_PROFILE_SKILLS_KEYS.mastery)}
          />
          <Button loading={userLoading} type="submit" variant="contained" disabled={!isValid}>
            Save
          </Button>
        </form>
      </Container>
    </ModalWindow>
  )
}
