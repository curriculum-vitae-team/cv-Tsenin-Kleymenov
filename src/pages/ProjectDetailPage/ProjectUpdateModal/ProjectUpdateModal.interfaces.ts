import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IProjectResult } from '@/appTypes/IResult.interfaces'

export interface IProjectUpdateModalProps extends IBaseModalProps {
  project?: IProjectResult
}
