import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItems {
  [key: string]: {
    text: string
    route: string
    icon: React.ComponentType<SvgIconProps>
  }
}
