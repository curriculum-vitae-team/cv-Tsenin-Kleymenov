import { FC } from 'react'
import { AppBar } from '@mui/material'

import { IProps } from './type'

const HeaderWrapper: FC<IProps> = ({ children }) => {
  return <AppBar color="primary">{children}</AppBar>
}

export default HeaderWrapper
