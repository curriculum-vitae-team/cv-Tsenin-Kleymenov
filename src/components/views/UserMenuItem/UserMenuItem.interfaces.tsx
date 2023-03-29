import { SvgIconProps } from '@mui/material/SvgIcon'

export interface IUserMenuItemProps {
  onClick?: () => void
  route: string
  Icon: React.ComponentType<SvgIconProps>
  text: string
  userId?: string
}
