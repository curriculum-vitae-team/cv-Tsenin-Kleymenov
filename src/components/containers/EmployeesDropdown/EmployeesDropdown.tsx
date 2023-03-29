import { FC } from 'react'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '../BasicMenu/BasicMenu'

import { IEmployeesDropdownProps } from './EmployeesDropdown.interfaces'

export const EmployeesDropdown: FC<IEmployeesDropdownProps> = ({ item }) => {
  return (
    <BasicMenu>
      <MenuItem>User: {item.id}</MenuItem>
      <MenuItem>Delete user</MenuItem>
    </BasicMenu>
  )
}
