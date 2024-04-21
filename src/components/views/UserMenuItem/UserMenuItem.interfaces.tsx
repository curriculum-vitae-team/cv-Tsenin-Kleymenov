import { SvgIconProps } from '@mui/material/SvgIcon'

export interface IUserMenuItemProps {
  onClick?: () => void
  Icon: React.ComponentType<SvgIconProps>
  text: string
}
