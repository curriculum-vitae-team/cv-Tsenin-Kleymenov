import { FC } from 'react'
import { Tabs, TabsProps } from '@mui/material'

export const AppTabs: FC<TabsProps> = ({ children, textColor, ...props }) => {
  return (
    <Tabs indicatorColor="primary" textColor={textColor} {...props}>
      {children}
    </Tabs>
  )
}
