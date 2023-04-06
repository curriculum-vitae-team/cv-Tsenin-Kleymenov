import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { AppNavigationRoutes } from '@/router/paths'

import { ICVsDropdownProps } from './CVsDropdown.interfaces'

export const CVsDropdown: FC<ICVsDropdownProps> = ({ CVId }) => {
  return (
    <BasicMenu>
      <Link
        to={`${CVId}/${AppNavigationRoutes.DETAILS}`}
        state={AppNavigationRoutes.CVS}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <MenuItem>CV</MenuItem>
      </Link>
      <MenuItem>Delete CV</MenuItem>
    </BasicMenu>
  )
}
