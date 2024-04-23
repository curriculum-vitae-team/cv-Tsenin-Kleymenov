import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_DEPARTMENT } from '@/graphql/department/deleteDepartmentMutation'
import { DEPARTMENTS } from '@/graphql/departments/departmentsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { DepartmentUpdateModal } from '@/pages/DepartmentsPage/DepartmentUpdateModal/DepartmentUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { IDepartmentDropdownProps } from './DepartmentDropdown.interfaces'

export const DepartmentDropdown: FC<IDepartmentDropdownProps> = ({ department }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [deleteDepartmentMutation] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{ query: DEPARTMENTS }]
  })

  const { t } = useTranslation()

  const handleDepartmentDelete = (): void => {
    deleteDepartmentMutation({
      variables: {
        department: {
          departmentId: department.id
        }
      }
    })

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={handleDepartmentDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <DepartmentUpdateModal department={department} onClose={toggleVisibility} />}
    </Box>
  )
}
