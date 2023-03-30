import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItemProps {
  onClick: () => void
  Icon: React.ComponentType<SvgIconProps>
  route: string
  text: string
}
