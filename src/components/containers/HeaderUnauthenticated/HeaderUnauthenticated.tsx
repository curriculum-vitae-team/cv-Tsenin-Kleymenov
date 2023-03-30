import { FC } from 'react'

import { HeaderWrapper } from '@/components/views/HeaderWrapper/HeaderWrapper'
import { NavigationTabs } from '@/components/views/NavigationTabs/NavigationTabs'
import { headerTabs } from '@/constants/tabs'
import { AppNavigationRoutes } from '@/router/paths'

import { HeaderTabsWrapper } from './HeaderUnauthenticated.styles'

export const HeaderUnauthenticated: FC = () => {
  return (
    <HeaderWrapper color="secondary">
      <HeaderTabsWrapper>
        <NavigationTabs tabs={headerTabs} defaultValue={AppNavigationRoutes.LOGIN} />
      </HeaderTabsWrapper>
    </HeaderWrapper>
  )
}
