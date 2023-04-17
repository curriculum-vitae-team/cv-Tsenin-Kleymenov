import { FC } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_DEPARTMENT } from '@/graphql/departments/deleteDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { DepartmentUpdateModal } from '@/pages/DepartmentsPage/DepartmentUpdateModal/DepartmentUpdateModal'

import { IDepartmentDropdownProps } from './DepartmentDropdown.interfaces'

export const DepartmentDropdown: FC<IDepartmentDropdownProps> = ({ department }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deleteDepartmentMutation] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const handleDepartmentDelete = (): void => {
    deleteDepartmentMutation({
      variables: { id: department.id }
    })
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>Update</MenuItem>
          <MenuItem onClick={handleDepartmentDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <DepartmentUpdateModal department={department} onClose={toggleVisibility} />}
    </Box>
  )
}
