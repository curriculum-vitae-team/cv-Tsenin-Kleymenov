import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItemProps {
  Icon: React.ComponentType<SvgIconProps>
  route: string
  text: string
  isActive?: boolean
}
