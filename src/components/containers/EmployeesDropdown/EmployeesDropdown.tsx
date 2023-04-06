import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { AppNavigationRoutes } from '@/router/paths'

import { BasicMenu } from '../BasicMenu/BasicMenu'

import { IEmployeesDropdownProps } from './EmployeesDropdown.interfaces'

export const EmployeesDropdown: FC<IEmployeesDropdownProps> = ({ userId }) => {
  return (
    <BasicMenu>
      <MenuItem>
        <Link
          to={`${userId}/${AppNavigationRoutes.PROFILE}`}
          state={AppNavigationRoutes.EMPLOYEES}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem>Delete user</MenuItem>
    </BasicMenu>
  )
}
