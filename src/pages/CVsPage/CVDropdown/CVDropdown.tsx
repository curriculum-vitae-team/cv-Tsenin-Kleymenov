import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { useDeleteCV } from '../hook/useDeleteCV'

import { ICVDropdownProps } from './CVDropdown.interfaces'

export const CVDropdown: FC<ICVDropdownProps> = ({ CV }) => {
  const navigate = useNavigate()

  const { user, isAdmin } = useUser()
  const userCheck = CV?.user?.id === user?.id

  const { t } = useTranslation()
  const { isDelete, toggleDelete } = useDeleteModal()

  const handleOpenCv = (): void => {
    const newUrl = `/${AppNavigationRoutes.CVS}/${CV?.id}/${AppNavigationRoutes.DETAILS}`
    navigate(newUrl, { replace: true, state: AppNavigationRoutes.CVS })
  }

  const { onSubmit, loading: loadingCv } = useDeleteCV(CV.id, toggleDelete)

  return (
    <>
      <BasicMenu>
        <MenuItem onClick={handleOpenCv}>{t('details')}</MenuItem>
        {(userCheck || isAdmin) && <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>}
      </BasicMenu>
      {isDelete && (
        <DeleteModal
          isLoading={loadingCv}
          title={t('confirmRemoveCv')}
          message={t('confirmRemoveCvMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </>
  )
}
