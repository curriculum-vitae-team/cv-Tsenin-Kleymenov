import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItems {
  [key: string]: {
    text: string
    icon: React.ComponentType<SvgIconProps>
  }
}
