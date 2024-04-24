import { ListItemTextProps } from '@mui/material'
import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ISideMenuItemProps {
  Icon: React.ComponentType<SvgIconProps>
  route: string
  text: string
  isActive?: boolean
}

export interface IListItemTextProps extends ListItemTextProps {
  isActive?: boolean
}
