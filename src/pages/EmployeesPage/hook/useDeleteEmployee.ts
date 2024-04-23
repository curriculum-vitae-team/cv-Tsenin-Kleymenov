import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_USER } from '@/graphql/user/deleteUserMutation'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteEmployee = (userId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteUserMutation, { loading }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_EMPLOYEES }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteUserMutation({
      variables: {
        user: {
          userId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
