import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_PROJECT } from '@/graphql/project/deleteProjectMutation'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteProject = (projectId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteProjectMutation, { loading }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteProjectMutation({
      variables: {
        project: {
          projectId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
