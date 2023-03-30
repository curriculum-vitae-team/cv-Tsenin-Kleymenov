import { TabsProps } from '@mui/material'

import { ITab } from '@/constants/tabs'

export interface INavigationTabsProps extends TabsProps {
  tabs: ITab[]
  defaultValue?: string
}
