import { FC } from 'react'

import { IProps } from './ContentLayoutWrapper.interfaces'
import { BoxWrapper } from './ContentLayoutWrapper.styles'

export const ContentLayoutWrapper: FC<IProps> = ({ children }) => {
  return <BoxWrapper>{children}</BoxWrapper>
}
