import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LinkProps } from 'react-router-dom'
import { ButtonProps } from '@mui/material'

export interface IButtonProps extends ButtonProps {
  component?: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
  to?: string
}
