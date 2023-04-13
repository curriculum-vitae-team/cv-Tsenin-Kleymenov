import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'

export interface ILanguageUpdateModalProps extends IBaseModalProps {
  language?: ILanguage
}
