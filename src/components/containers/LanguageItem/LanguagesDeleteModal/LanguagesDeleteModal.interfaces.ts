import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'

export interface ILanguageItemDeleteProps extends IBaseModalProps {
  userData?: {
    id: string
    name: string
  }
}
