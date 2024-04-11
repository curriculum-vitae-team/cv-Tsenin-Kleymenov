import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface ILanguageItemModalProps extends IBaseModalProps {
  userData?: IUser
}
