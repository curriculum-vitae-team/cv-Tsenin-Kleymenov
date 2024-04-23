import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_POSITION } from '@/graphql/position/deletePositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeletePosition = (positionId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deletePositionMutation, { loading }] = useMutation(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  })

  const onSubmit = async (): Promise<void> => {
    await deletePositionMutation({
      variables: {
        position: {
          positionId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
