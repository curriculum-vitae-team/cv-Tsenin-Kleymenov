import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'

export interface IDeleteModalProps extends IBaseModalProps {
  message: string
  title: string
  onSubmit: () => void
  isLoading: boolean
}
