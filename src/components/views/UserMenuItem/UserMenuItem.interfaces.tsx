import { SvgIconProps } from '@mui/material/SvgIcon'

export interface IUserMenuItem {
   onClick: () => void
   Icon: React.ComponentType<SvgIconProps>
   text: string
 }