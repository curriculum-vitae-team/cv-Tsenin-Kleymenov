import { FC, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRole'
import { authService } from '@/graphql/auth/authService'
import { DELETE_DEPARTMENT } from '@/graphql/departments/deleteDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { DepartmentUpdateModal } from '@/pages/DepartmentsPage/DepartmentUpdateModal/DepartmentUpdateModal'

import { IDepartmentDropdownProps } from './DepartmentDropdown.interfaces'

export const DepartmentDropdown: FC<IDepartmentDropdownProps> = ({ department }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [open, setOpen] = useState<boolean>(false)

  const [deleteDepartmentMutation] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const handleDepartmentDelete = (): void => {
    deleteDepartmentMutation({
      variables: { id: department.id }
    })
  }

  const handleModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={handleModalClose}>Update</MenuItem>
          <MenuItem onClick={handleDepartmentDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {open && <DepartmentUpdateModal department={department} onClose={handleModalClose} />}
    </Box>
  )
}
