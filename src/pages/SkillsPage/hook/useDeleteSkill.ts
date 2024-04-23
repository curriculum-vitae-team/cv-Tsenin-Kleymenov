import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_SKILL } from '@/graphql/skill/deleteSkillMutation'
import { SKILLS } from '@/graphql/skills/skillsQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteSkill = (skillId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteSkillMutation, { loading }] = useMutation(DELETE_SKILL, {
    refetchQueries: [{ query: SKILLS }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteSkillMutation({
      variables: {
        skill: {
          skillId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
