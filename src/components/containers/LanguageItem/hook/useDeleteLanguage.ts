import { useMutation } from '@apollo/client'

import { IUseDeleteModal } from '@/appTypes/IBaseModalProps.interfaces'
import { DELETE_PROFILE_LANGUAGE } from '@/graphql/language/profile_language/deleteProfileLanguageMutation'

interface ILanguageItemProps {
  id: string
  languageName: string
}

export const useDeleteLanguage = (
  userData: ILanguageItemProps,
  onClose: () => void
): IUseDeleteModal => {
  const [deleteProfileLanguage, { loading }] = useMutation(DELETE_PROFILE_LANGUAGE)

  const onSubmit = async (): Promise<void> => {
    await deleteProfileLanguage({
      variables: {
        language: {
          userId: userData?.id,
          name: userData?.languageName
        }
      }
    })

    onClose()
  }

  return { onSubmit, loading }
}
