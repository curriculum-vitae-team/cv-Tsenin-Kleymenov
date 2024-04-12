import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ILanguageProficiency } from '@/graphql/interfaces/ILanguageProficiency.interfaces'

import { ILanguageInfo } from '../LanguageItem.interfaces'

export interface ILanguageItemModalProps extends IBaseModalProps {
  userData?: {
    id: string
    languages: ILanguageProficiency[]
  }
  languageInfo: {
    language?: ILanguageInfo
    setLanguage: (language: ILanguageInfo) => void
  }
}
