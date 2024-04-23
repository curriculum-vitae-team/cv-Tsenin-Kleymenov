import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { DepartmentUpdateModal } from '@/pages/DepartmentsPage/DepartmentUpdateModal/DepartmentUpdateModal'

import { useDeleteDepartment } from '../hook/useDeleteDepartment'

import { IDepartmentDropdownProps } from './DepartmentDropdown.interfaces'

export const DepartmentDropdown: FC<IDepartmentDropdownProps> = ({ department }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const { onSubmit, loading: loadingDepartment } = useDeleteDepartment(department.id, toggleDelete)

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <DepartmentUpdateModal department={department} onClose={toggleVisibility} />}
      {isDelete && (
        <DeleteModal
          isLoading={loadingDepartment}
          title={t('confirmRemoveDepartment')}
          message={t('confirmRemoveDepartmentMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </Box>
  )
}
