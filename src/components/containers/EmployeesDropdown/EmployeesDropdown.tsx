import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { AppNavigationRoutes } from '@/router/paths'

import { IEmployeesDropdownProps } from './EmployeesDropdown.interfaces'

export const EmployeesDropdown: FC<IEmployeesDropdownProps> = ({ userId }) => {
  const navigate = useNavigate()

  const handleOpenEmployee = (): void => {
    navigate(`${userId}/${AppNavigationRoutes.PROFILE}`, { state: AppNavigationRoutes.EMPLOYEES })
  }
  
  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenEmployee}>Profile</MenuItem>
      <MenuItem>Delete user</MenuItem>
    </BasicMenu>
  )
}
