import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { DELETE_CV } from '@/graphql/cv/deleteCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { ICVDropdownProps } from './CVDropdown.interfaces'

export const CVDropdown: FC<ICVDropdownProps> = ({ CV }) => {
  const navigate = useNavigate()

  const [user, isAdmin] = useUser()
  const userCheck = CV?.user?.id === user?.id

  const [deleteCVMutation] = useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }]
  })

  const { t } = useTranslation()

  const handleOpenCv = (): void => {
    navigate(`${CV?.id}/${AppNavigationRoutes.DETAILS}`, { state: AppNavigationRoutes.CVS })
  }

  const handleCVDelete = (): void => {
    deleteCVMutation({
      variables: { id: CV.id }
    })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenCv}>{t('Details')}</MenuItem>
      {(userCheck || isAdmin) && <MenuItem onClick={handleCVDelete}>{t('Delete')}</MenuItem>}
    </BasicMenu>
  )
}
