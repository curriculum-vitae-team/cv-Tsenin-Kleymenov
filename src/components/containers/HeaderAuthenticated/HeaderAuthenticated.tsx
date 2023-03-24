import { FC } from 'react'

import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { SideMenu } from '@/components/views/SideMenu/SideMenu'
import { UserMenu } from '@/components/views/UserMenu/UserMenu'

import { HeaderMenuWrapper } from './HeaderAuthenticated.styles'

export const HeaderAuthenticated: FC = () => {
  return (
    <HeaderWrapper color="secondary">
      <HeaderMenuWrapper>
        <SideMenu />
        <UserMenu />
      </HeaderMenuWrapper>
    </HeaderWrapper>
  )
}
