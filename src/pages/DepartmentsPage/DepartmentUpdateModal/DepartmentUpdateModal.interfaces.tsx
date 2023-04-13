import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { IDepartment } from '@/graphql/interfaces/IDepartment.interfaces'

export interface IDepartmentUpdateModalProps extends IBaseModalProps {
  department?: IDepartment
}
