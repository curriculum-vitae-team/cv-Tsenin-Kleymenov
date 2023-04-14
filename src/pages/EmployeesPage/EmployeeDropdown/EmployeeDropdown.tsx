import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useReactiveVar } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_USER } from '@/graphql/users/deleteUserMutation'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { IEmployeeDropdownProps } from './EmployeeDropdown.interfaces'

export const EmployeeDropdown: FC<IEmployeeDropdownProps> = ({ employee }) => {
  const navigate = useNavigate()
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [deleteUserMutation] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_EMPLOYEES }]
  })
  const handleOpenEmployee = (): void => {
    navigate(`${employee?.id}/${AppNavigationRoutes.PROFILE}`, {
      state: AppNavigationRoutes.EMPLOYEES
    })
  }

  const handleUserDelete = (): void => {
    deleteUserMutation({
      variables: { id: employee.id }
    })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenEmployee}>Profile</MenuItem>
      {isAdmin && <MenuItem onClick={handleUserDelete}>Delete</MenuItem>}
    </BasicMenu>
  )
}
