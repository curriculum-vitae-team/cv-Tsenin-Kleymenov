import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItem {
  onClick: () => void
  Icon: React.ComponentType<SvgIconProps>
  route: string
  text: string
}
