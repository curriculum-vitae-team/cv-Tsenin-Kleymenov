import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_DEPARTMENT } from '@/graphql/departments/deleteDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { DepartmentUpdateModal } from '@/pages/DepartmentsPage/DepartmentUpdateModal/DepartmentUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { IDepartmentDropdownProps } from './DepartmentDropdown.interfaces'

export const DepartmentDropdown: FC<IDepartmentDropdownProps> = ({ department }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const { t } = useTranslation()
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deleteDepartmentMutation] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const handleDepartmentDelete = (): void => {
    deleteDepartmentMutation({
      variables: { id: department.id }
    })

    toastMessage('Successfully deleted', TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('Update')}</MenuItem>
          <MenuItem onClick={handleDepartmentDelete}>{t('Delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <DepartmentUpdateModal department={department} onClose={toggleVisibility} />}
    </Box>
  )
}
