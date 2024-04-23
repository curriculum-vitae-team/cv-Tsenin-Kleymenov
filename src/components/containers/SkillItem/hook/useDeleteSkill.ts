import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { DELETE_PROFILE_SKILL } from '@/graphql/skill/profile_skill/deleteProfileSkillMutation'

interface ISkillItemProps {
  id: string
  skillName: string
}

export const useDeleteSkill = (userData: ISkillItemProps, onClose: () => void): IUseDeleteModal => {
  const [deleteProfileSkill, { loading }] = useMutation(DELETE_PROFILE_SKILL)

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

  return { onSubmit, loading }
}
