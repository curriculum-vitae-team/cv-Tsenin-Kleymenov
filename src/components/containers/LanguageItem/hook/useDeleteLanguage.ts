import { useMutation } from '@apollo/client'

import { DELETE_PROFILE_LANGUAGE } from '@/graphql/language/profile_language/deleteProfileLanguageMutation'

interface ILanguageItemProps {
  id: string
  languageName: string
}

interface IUseDeleteLanguage {
  onSubmit: () => Promise<void>
  deleteProfileLangLoading: boolean
}

export const useDeleteLanguage = (
  userData: ILanguageItemProps,
  onClose: () => void
): IUseDeleteLanguage => {
  const [deleteProfileLanguage, { loading: deleteProfileLangLoading }] =
    useMutation(DELETE_PROFILE_LANGUAGE)

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

  return { onSubmit, deleteProfileLangLoading }
}
