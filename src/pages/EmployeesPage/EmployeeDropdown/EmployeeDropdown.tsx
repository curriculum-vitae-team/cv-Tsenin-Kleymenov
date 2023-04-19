import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_USER } from '@/graphql/user/deleteUserMutation'
import { GET_EMPLOYEES } from '@/graphql/users/usersQuery'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'
import { toastMessage } from '@/utils/toastMessage'

import { IEmployeeDropdownProps } from './EmployeeDropdown.interfaces'

export const EmployeeDropdown: FC<IEmployeeDropdownProps> = ({ employee }) => {
  const navigate = useNavigate()

  const { isAdmin } = useUser()

  const [deleteUserMutation] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_EMPLOYEES }]
  })

  const { t } = useTranslation()

  const handleOpenEmployee = (): void => {
    navigate(`${employee?.id}/${AppNavigationRoutes.PROFILE}`, {
      state: AppNavigationRoutes.EMPLOYEES
    })
  }

  const handleUserDelete = (): void => {
    deleteUserMutation({
      variables: { id: employee.id }
    })

    toastMessage(t('Successfully deleted'), TOAST_TYPES.success)
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenEmployee}>{t('Profile')}</MenuItem>
      {isAdmin && <MenuItem onClick={handleUserDelete}>{t('Delete')}</MenuItem>}
    </BasicMenu>
  )
}
