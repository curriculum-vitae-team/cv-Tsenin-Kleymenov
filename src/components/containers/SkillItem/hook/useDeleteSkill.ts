import { useMutation } from '@apollo/client'

import { DELETE_PROFILE_SKILL } from '@/graphql/skill/profile_skill/deleteProfileSkillMutation'

interface ISkillItemProps {
  id: string
  skillName: string
}

interface IUseDeleteSkill {
  onSubmit: () => Promise<void>
  deleteProfileSkillLoading: boolean
}

export const useDeleteSkill = (userData: ISkillItemProps, onClose: () => void): IUseDeleteSkill => {
  const [deleteProfileSkill, { loading: deleteProfileSkillLoading }] =
    useMutation(DELETE_PROFILE_SKILL)

  const onSubmit = async (): Promise<void> => {
    await deleteProfileSkill({
      variables: {
        skill: {
          userId: userData?.id,
          name: userData?.skillName
        }
      }
    })

    onClose()
  }

  return { onSubmit, deleteProfileSkillLoading }
}
