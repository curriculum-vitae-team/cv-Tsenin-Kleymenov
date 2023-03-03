import { FC } from 'react'

import { Header } from './index.styles'
import { IProps } from './type'

const HeaderWrapper: FC<IProps> = ({ children }) => {
  return <Header color="primary">{children}</Header>
}

export default HeaderWrapper
