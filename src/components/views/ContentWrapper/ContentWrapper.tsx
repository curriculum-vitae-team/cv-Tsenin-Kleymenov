import { FC } from 'react'

import { IBaseChildrenProps } from '@/appTypes/IBaseChildrenProps.interfaces'

import { Content } from './ContentWrapper.styles'

export const ContentWrapper: FC<IBaseChildrenProps> = ({ children }) => {
  return <Content>{children}</Content>
}
