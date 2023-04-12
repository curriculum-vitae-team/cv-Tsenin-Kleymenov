import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { AppNavigationRoutes } from '@/router/paths'

import { BasicMenu } from '../BasicMenu/BasicMenu'

import { IEmployeesDropdownProps } from './EmployeesDropdown.interfaces'

export const EmployeesDropdown: FC<IEmployeesDropdownProps> = ({ userId }) => {
  return (
    <BasicMenu>
      <Link
        to={`${userId}/${AppNavigationRoutes.PROFILE}`}
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <MenuItem>Profile</MenuItem>
      </Link>
      <MenuItem>Delete user</MenuItem>
    </BasicMenu>
  )
}
