import { ILanguageProficiency } from '@/graphql/interfaces/ILanguageProficiency.interfaces'

export const createLanguagesArray = (data?: ILanguageProficiency[]): ILanguageProficiency[] => {
  if (data) {
    return data.map(({ name, proficiency }) => {
      return { name, proficiency }
    })
  }
  return []
}
