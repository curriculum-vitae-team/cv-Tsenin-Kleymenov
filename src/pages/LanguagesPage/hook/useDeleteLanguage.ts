import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_LANGUAGE } from '@/graphql/language/deleteLanguageMutation'
import { LANGUAGES } from '@/graphql/languages/languagesQuery'
import { toastMessage } from '@/utils/toastMessage'

export const useDeleteLanguage = (languageId: string, onClose: () => void): IUseDeleteModal => {
  const { t } = useTranslation()

  const [deleteLanguageMutation, { loading }] = useMutation(DELETE_LANGUAGE, {
    refetchQueries: [{ query: LANGUAGES }]
  })

  const onSubmit = async (): Promise<void> => {
    await deleteLanguageMutation({
      variables: {
        language: {
          languageId
        }
      }
    })

    onClose()

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return { onSubmit, loading }
}
