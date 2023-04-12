import { ReactNode } from 'react'

import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'

export interface IModalWindowProps extends IBaseModalProps {
  children: ReactNode
}
