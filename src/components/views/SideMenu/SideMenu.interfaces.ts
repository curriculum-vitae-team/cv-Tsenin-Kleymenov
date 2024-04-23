import { SvgIconProps } from '@mui/material/SvgIcon'

export interface IMenuItems {
  [key: string]: {
    text: string
    onClick?: () => void
    icon: React.ComponentType<SvgIconProps>
    isActive?: boolean
    route?: string
  }
}
