import { FC } from 'react'

import { LanguageMenu } from '@/components/containers/LanguageMenu/LanguageMenu'
import { UserMenu } from '@/components/views/UserMenu/UserMenu'

import { Header, HeaderMenuWrapper } from './HeaderAuthenticated.styles'

export const HeaderAuthenticated: FC = () => {
  return (
    <Header color="secondary">
      <HeaderMenuWrapper>
        <div style={{ display: 'flex' }}>
          <UserMenu />
          <LanguageMenu />
        </div>
      </HeaderMenuWrapper>
    </Header>
  )
}
