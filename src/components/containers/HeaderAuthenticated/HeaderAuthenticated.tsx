import { FC } from 'react'
import { Container } from '@mui/material'

import { LanguageMenu } from '@/components/containers/LanguageMenu/LanguageMenu'
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
          <div style={{ display: 'flex' }}>
            <UserMenu />
            <LanguageMenu />
          </div>
        </HeaderMenuWrapper>
      </Container>
    </HeaderWrapper>
  )
}
