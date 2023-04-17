import { FC } from 'react'

import { LanguageMenu } from '@/components/containers/LanguageMenu/LanguageMenu'
import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { HEADER_TABS } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

import { HeaderTabsWrapper } from './HeaderUnauthenticated.styles'

export const HeaderUnauthenticated: FC = () => {
  return (
    <HeaderWrapper color="secondary">
      <LanguageMenu />
      <HeaderTabsWrapper>
        <NavigationTabs tabs={HEADER_TABS} defaultValue={AppNavigationRoutes.LOGIN} />
      </HeaderTabsWrapper>
    </HeaderWrapper>
  )
}
