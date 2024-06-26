import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_CV } from '@/graphql/cv/deleteCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteCV = (cvId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteCVMutation, { loading }] = useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteCVMutation({
      variables: {
        cv: {
          cvId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
