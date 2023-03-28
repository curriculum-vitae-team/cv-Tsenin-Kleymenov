import { SvgIconProps } from '@mui/material/SvgIcon'

import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IUserMenuItemProps {
  onClick?: () => void | null
  route: string
  Icon: React.ComponentType<SvgIconProps>
  text: string
  user?: IUser | null
}
