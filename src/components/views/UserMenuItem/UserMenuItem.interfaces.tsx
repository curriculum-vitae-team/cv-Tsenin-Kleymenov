import { SvgIconProps } from '@/mui/material/SvgIcon'

export interface IUserMenuItem {
  route: string
  Icon: React.ComponentType<SvgIconProps>
  text: string
}
