import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { useDeleteEmployee } from '../hook/useDeleteEmployee'

import { IEmployeeDropdownProps } from './EmployeeDropdown.interfaces'

export const EmployeeDropdown: FC<IEmployeeDropdownProps> = ({ employee }) => {
  const navigate = useNavigate()

  const { isAdmin } = useUser()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const handleOpenEmployee = (): void => {
    navigate(`${employee?.id}/${AppNavigationRoutes.PROFILE}`, {
      state: AppNavigationRoutes.EMPLOYEES
    })
  }

  const { onSubmit, loading: loadingEmployee } = useDeleteEmployee(employee.id, toggleDelete)

  return (
    <>
      <BasicMenu>
        <MenuItem onClick={handleOpenEmployee}>{t('profile')}</MenuItem>
        {isAdmin && <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>}
      </BasicMenu>
      {isDelete && (
        <DeleteModal
          isLoading={loadingEmployee}
          title={t('confirmRemoveEmployee')}
          message={t('confirmRemoveEmployeeMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </>
  )
}
