import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IPosition } from '@/graphql/interfaces/IPosition.interfaces'

export interface IPositionUpdateModalProps extends IBaseModalProps {
  position?: IPosition
}
