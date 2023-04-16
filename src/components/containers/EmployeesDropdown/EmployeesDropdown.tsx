import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { AppNavigationRoutes } from '@/router/paths'

import { IEmployeesDropdownProps } from './EmployeesDropdown.interfaces'

export const EmployeesDropdown: FC<IEmployeesDropdownProps> = ({ userId }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleOpenEmployee = (): void => {
    navigate(`${userId}/${AppNavigationRoutes.PROFILE}`, { state: AppNavigationRoutes.EMPLOYEES })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenEmployee}>{t('Details')}</MenuItem>
      <MenuItem>{t('Delete')}</MenuItem>
    </BasicMenu>
  )
}
