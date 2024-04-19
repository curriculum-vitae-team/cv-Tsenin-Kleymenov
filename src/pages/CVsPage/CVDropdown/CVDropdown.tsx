import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { DELETE_CV } from '@/graphql/cv/deleteCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'
import { toastMessage } from '@/utils/toastMessage'

import { ICVDropdownProps } from './CVDropdown.interfaces'

export const CVDropdown: FC<ICVDropdownProps> = ({ CV }) => {
  const navigate = useNavigate()

  const { user, isAdmin } = useUser()
  const userCheck = CV?.user?.id === user?.id

  const [deleteCVMutation, { loading: loadingCv }] = useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }]
  })

  const { t } = useTranslation()

  const handleOpenCv = (): void => {
    const newUrl = `/${AppNavigationRoutes.CVS}/${CV?.id}/${AppNavigationRoutes.DETAILS}`
    navigate(newUrl, { replace: true, state: AppNavigationRoutes.CVS })
  }

  const handleCVDelete = (): void => {
    deleteCVMutation({
      variables: {
        cv: {
          cvId: CV.id
        }
      }
    })

    toastMessage(t('successfullyDeleted'), TOAST_TYPES.success)
  }

  const { isDelete, toggleDelete } = useDeleteModal()

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
          onSubmit={handleCVDelete}
          onClose={toggleDelete}
        />
      )}
    </>
  )
}
