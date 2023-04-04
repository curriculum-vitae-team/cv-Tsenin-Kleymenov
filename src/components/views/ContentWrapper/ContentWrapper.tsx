import { FC } from 'react'

import { IContentWrapperProps } from './ContentWrapper.interfaces'
import { Content } from './ContentWrapper.styles'

export const ContentWrapper: FC<IContentWrapperProps> = ({ children }) => {
  return <Content>{children}</Content>
}
