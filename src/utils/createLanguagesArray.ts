import { ILanguageProficiency } from '@/graphql/interfaces/ILanguageProficiency.interfaces'

export const createLanguagesArray = (
  data?: ILanguageProficiency[]
): ILanguageProficiency[] => {
  if (data) {
    return data.map(({ language_name, proficiency }) => {
      return { language_name, proficiency }
    })
  }
  return []
}
