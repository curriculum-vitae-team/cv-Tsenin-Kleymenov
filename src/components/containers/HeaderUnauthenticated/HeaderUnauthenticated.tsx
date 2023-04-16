import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '@mui/material'

import { LanguageMenu } from '@/components/containers/LanguageMenu/LanguageMenu'
import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { LANGUAGES } from '@/constants/languages'
import { HEADER_TABS } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

import { HeaderTabsWrapper } from './HeaderUnauthenticated.styles'

export const HeaderUnauthenticated: FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)
  }

  return (
    <HeaderWrapper color="secondary" style={{ display: 'flex' }}>
      <LanguageMenu>
        <MenuItem onClick={() => changeLanguage(LANGUAGES.EN)}>EN</MenuItem>
        <MenuItem onClick={() => changeLanguage(LANGUAGES.RU)}>RU</MenuItem>
      </LanguageMenu>
      <HeaderTabsWrapper>
        <NavigationTabs tabs={HEADER_TABS} defaultValue={AppNavigationRoutes.LOGIN} />
      </HeaderTabsWrapper>
    </HeaderWrapper>
  )
}
