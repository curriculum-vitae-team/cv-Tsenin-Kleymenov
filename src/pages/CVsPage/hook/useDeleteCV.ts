import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_CV } from '@/graphql/cv/deleteCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { toastMessage } from '@/utils/toastMessage'

interface IUseDeleteCV {
  onSubmit: () => Promise<void>
  loadingCv: boolean
}

export const useDeleteCV = (cvId: string, onClose: () => void): IUseDeleteCV => {
  const { t } = useTranslation()

  const [deleteCVMutation, { loading: loadingCv }] = useMutation(DELETE_CV, {
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

  return { onSubmit, loadingCv }
}
