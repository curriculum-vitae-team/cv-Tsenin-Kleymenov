import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '@mui/material'

import { AppTabs } from '@/components/views/AppTabs/AppTabs'
import { filterRoutPath } from '@/utils/tabsFilter'

import { INavigationTabsProps } from './NavigationTabs.interfaces'

export const NavigationTabs: FC<INavigationTabsProps> = ({ tabs, defaultValue, textColor }) => {
  const location = useLocation()

  return (
    <AppTabs textColor={textColor} value={filterRoutPath(location.pathname, tabs) || defaultValue}>
      {tabs.map(({ label, path }) => (
        <Tab key={label} label={label} value={path} component={Link} to={path} />
      ))}
    </AppTabs>
  )
}
