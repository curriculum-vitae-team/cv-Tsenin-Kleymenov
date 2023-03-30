import { FC } from 'react'

import { IHeaderWrapperProps } from './HeaderWrapper.interfaces'
import { Header } from './HeaderWrapper.styles'

export const HeaderWrapper: FC<IHeaderWrapperProps> = ({ children }) => {
  return <Header color="secondary">{children}</Header>
}
