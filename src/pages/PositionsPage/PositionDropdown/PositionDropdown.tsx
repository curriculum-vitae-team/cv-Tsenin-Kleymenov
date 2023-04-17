import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { TOAST_TYPES } from '@/constants/toastTypes'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_POSITION } from '@/graphql/positions/deletePositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { PositionUpdateModal } from '@/pages/PositionsPage/PositionUpdateModal/PositionUpdateModal'
import { toastMessage } from '@/utils/toastMessage'

import { IPositionDropdownProps } from './PositionDropdown.interfaces'

export const PositionDropdown: FC<IPositionDropdownProps> = ({ position }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const { t } = useTranslation()
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deletePositionMutation] = useMutation(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  })

  const handlePositionDelete = (): void => {
    deletePositionMutation({
      variables: { id: position.id }
    })

    toastMessage('Successfully deleted', TOAST_TYPES.success)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('Update')}</MenuItem>
          <MenuItem onClick={handlePositionDelete}>{t('Delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <PositionUpdateModal position={position} onClose={toggleVisibility} />}
    </Box>
  )
}
