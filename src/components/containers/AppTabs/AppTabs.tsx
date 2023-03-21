import { FC } from 'react'
import { Tabs } from '@mui/material'

import { IProps } from './AppTabs.interfaces'

const AppTabs: FC<IProps> = ({ children, textColor, tab, setTab }) => {
  const handleChange = (_: React.SyntheticEvent, newTab: string): void => {
    setTab(newTab)
  }

  return (
    <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor={textColor}>
      {children}
    </Tabs>
  )
}

export default AppTabs
