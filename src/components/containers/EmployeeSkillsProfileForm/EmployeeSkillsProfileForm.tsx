import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Divider, Typography } from '@mui/material'

import { ISkillsResult, IUserResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { AppSelect } from '@/components/views/Select/Select'
import { MASTERY_ARRAY } from '@/constants/mastery'
import { FORM_PROFILE_SKILLS_SCHEMA } from '@/constants/schemaOptions'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { UPDATE_USER } from '@/graphql/user/updateUserMutation'
import { USER } from '@/graphql/user/userQuery'
import { createSkillsArray } from '@/utils/createSkillsArray'

import { ModalWindow } from '../../views/ModalWindow/ModalWindow'
import { SkillRow } from '../../views/SkillRow/SkillRow'

import {
  FORM_PROFILE_SKILLS_KEYS,
  IProfileSkillFormValues
} from './EmployeeSkillsProfileForm.interfaces'

export const EmployeeSkillsProfileForm: FC = () => {
  const { id: userId } = useParams()
  const [open, setOpen] = useState(false)
  const { data: userData } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  })
  const { loading: loadingSkills, data: skillsData } = useQuery<ISkillsResult>(SKILLS)
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER, {
    refetchQueries: () => [{ query: USER, variables: { id: userId } }]
  })
  
  const skillsNameArray = userData?.user.profile.skills.map(item => item.skill_name)

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
        id: userId,
        user: {
          profile: {
            first_name: userData?.user?.profile.first_name || '',
            last_name: userData?.user?.profile.last_name || '',
            skills: [
              {
                skill_name: formData[FORM_PROFILE_SKILLS_KEYS.skills],
                mastery: formData[FORM_PROFILE_SKILLS_KEYS.mastery]
              },
              ...createSkillsArray(userData?.user?.profile.skills)
            ]
          },
          departmentId: userData?.user?.department?.id || '',
          positionId: userData?.user?.position?.id || ''
        }
      }
    })
    setOpen(false)
  }

  useEffect(() => {
    reset({
      [FORM_PROFILE_SKILLS_KEYS.skills]: '',
      [FORM_PROFILE_SKILLS_KEYS.mastery]: ''
    })
  }, [isSubmitSuccessful])

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      <Button
        sx={{ maxWidth: 170, my: 3, alignSelf: 'flex-end' }}
        variant="contained"
        onClick={handleClickOpen}
      >
        + Add skills
      </Button>
      <Divider />
      {skillsNameArray?.length ? (
        MASTERY_ARRAY.map(item => (
          <SkillRow key={item.id} skills={userData?.user?.profile?.skills} mastery={item.name} />
        ))
      ) : (
        <Typography sx={{ my: 2 }} variant="h5">
          You don't have any skills
        </Typography>
      )}
      <ModalWindow modalOpen={open} closeModal={handleClose}>
        <Container sx={{ minWidth: '500px' }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <AppSelect
              variant="outlined"
              label="Skills"
              defaultValue={''}
              loading={loadingSkills}
              items={skillsData?.skills.filter(element => !skillsNameArray?.includes(element.name))}
              error={!!errors[FORM_PROFILE_SKILLS_KEYS.skills]}
              helperText={errors?.[FORM_PROFILE_SKILLS_KEYS.skills]?.message}
              {...register(FORM_PROFILE_SKILLS_KEYS.skills)}
            />
            <AppSelect
              variant="outlined"
              label="Mastery"
              defaultValue={''}
              items={MASTERY_ARRAY}
              error={!!errors[FORM_PROFILE_SKILLS_KEYS.mastery]}
              helperText={errors?.[FORM_PROFILE_SKILLS_KEYS.mastery]?.message}
              {...register(FORM_PROFILE_SKILLS_KEYS.mastery)}
            />
            <Button loading={userLoading} type="submit" variant="contained" disabled={!isValid}>
              Save
            </Button>
          </form>
        </Container>
      </ModalWindow>
    </Container>
  )
}
