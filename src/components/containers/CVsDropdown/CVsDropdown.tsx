import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { AppNavigationRoutes } from '@/router/paths'

import { ICVsDropdownProps } from './CVsDropdown.interfaces'

export const CVsDropdown: FC<ICVsDropdownProps> = ({ CVId }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleOpenCv = (): void => {
    navigate(`${CVId}/${AppNavigationRoutes.DETAILS}`, { state: AppNavigationRoutes.CVS })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenCv}>{t('Details')}</MenuItem>
      <MenuItem>{t('Delete')}</MenuItem>
    </BasicMenu>
  )
}
