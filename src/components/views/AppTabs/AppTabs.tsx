import { FC } from 'react'
import { Tabs, TabsProps } from '@mui/material'

const AppTabs: FC<TabsProps> = ({ children, textColor, ...props }) => {
  return (
    <Tabs indicatorColor="primary" textColor={textColor} {...props}>
      {children}
    </Tabs>
  )
}

export default AppTabs
