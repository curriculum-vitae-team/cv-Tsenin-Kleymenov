import { FC } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_POSITION } from '@/graphql/positions/deletePositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { PositionUpdateModal } from '@/pages/PositionsPage/PositionUpdateModal/PositionUpdateModal'

import { IPositionDropdownProps } from './PositionDropdown.interfaces'

export const PositionDropdown: FC<IPositionDropdownProps> = ({ position }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin
  const [isVisible, toggleVisibility] = useBooleanState()

  const [deletePositionMutation] = useMutation(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  })

  const handlePositionDelete = (): void => {
    deletePositionMutation({
      variables: { id: position.id }
    })
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>Update</MenuItem>
          <MenuItem onClick={handlePositionDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <PositionUpdateModal position={position} onClose={toggleVisibility} />}
    </Box>
  )
}
