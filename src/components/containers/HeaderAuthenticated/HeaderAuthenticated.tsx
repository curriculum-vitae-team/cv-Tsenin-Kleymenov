import { FC } from 'react'
import { Container } from '@mui/material'

import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { SideMenu } from '@/components/views/SideMenu/SideMenu'
import { UserMenu } from '@/components/views/UserMenu/UserMenu'

import { HeaderMenuWrapper } from './HeaderAuthenticated.styles'

export const HeaderAuthenticated: FC = () => {
  return (
    <HeaderWrapper color="secondary">
      <Container maxWidth="xl">
        <HeaderMenuWrapper>
          <SideMenu />
          <UserMenu />
        </HeaderMenuWrapper>
      </Container>
    </HeaderWrapper>
  )
}
