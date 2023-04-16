import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, MenuItem } from '@mui/material'

import { LanguageMenu } from '@/components/containers/LanguageMenu/LanguageMenu'
import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { SideMenu } from '@/components/views/SideMenu/SideMenu'
import { UserMenu } from '@/components/views/UserMenu/UserMenu'
import { LANGUAGES } from '@/constants/languages'

import { HeaderMenuWrapper } from './HeaderAuthenticated.styles'

export const HeaderAuthenticated: FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)
  }

  return (
    <HeaderWrapper color="secondary">
      <Container maxWidth="xl">
        <HeaderMenuWrapper>
          <SideMenu />
          <div style={{ display: 'flex' }}>
            <UserMenu />
            <LanguageMenu>
              <MenuItem onClick={() => changeLanguage(LANGUAGES.EN)}>EN</MenuItem>
              <MenuItem onClick={() => changeLanguage(LANGUAGES.RU)}>RU</MenuItem>
            </LanguageMenu>
          </div>
        </HeaderMenuWrapper>
      </Container>
    </HeaderWrapper>
  )
}
