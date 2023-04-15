import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useReactiveVar } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_CV } from '@/graphql/cv/deleteCVMutation'
import { GET_CVS } from '@/graphql/cvs/cvsQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { ICVDropdownProps } from './CVDropdown.interfaces'

export const CVDropdown: FC<ICVDropdownProps> = ({ CV }) => {
  const navigate = useNavigate()
  const user = useReactiveVar(authService.user$)
  const userCheck = CV?.user?.id === user?.id
  const isAdmin = user?.role === ROLE.admin

  const [deleteCVMutation] = useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }]
  })

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
      <MenuItem onClick={handleOpenCv}>CV Details</MenuItem>
      {(userCheck || isAdmin) && <MenuItem onClick={handleCVDelete}>Delete CV</MenuItem>}
    </BasicMenu>
  )
}
