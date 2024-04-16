import { SvgIconProps } from '@mui/material/SvgIcon'

export interface IMenuItems {
  [key: string]: {
    text: string
    route: string
    icon: React.ComponentType<SvgIconProps>
    isActive?: boolean
  }
}
