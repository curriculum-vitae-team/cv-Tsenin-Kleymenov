import { FC } from 'react'

import { IBaseChildrenProps } from '@/appTypes/IBaseChildrenProps.interfaces'

import { Header } from './HeaderWrapper.styles'

export const HeaderWrapper: FC<IBaseChildrenProps> = ({ children }) => {
  return <Header color="secondary">{children}</Header>
}
