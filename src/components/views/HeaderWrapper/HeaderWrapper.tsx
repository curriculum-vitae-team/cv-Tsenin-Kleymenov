import { FC } from 'react'

import { IProps } from './HeaderWrapper.interfaces'
import { Header } from './HeaderWrapper.styles'

const HeaderWrapper: FC<IProps> = ({ children }) => {
  return <Header color="secondary">{children}</Header>
}

export default HeaderWrapper
