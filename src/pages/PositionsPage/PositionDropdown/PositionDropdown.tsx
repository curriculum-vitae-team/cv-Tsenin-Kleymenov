import { FC, useState } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRole'
import { authService } from '@/graphql/auth/authService'
import { DELETE_POSITION } from '@/graphql/positions/deletePositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { PositionUpdateModal } from '@/pages/PositionsPage/PositionUpdateModal/PositionUpdateModal'

import { IPositionDropdownProps } from './PositionDropdown.interfaces'

export const PositionDropdown: FC<IPositionDropdownProps> = ({ position }) => {
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [open, setOpen] = useState<boolean>(false)

  const [deletePositionMutation] = useMutation(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  })

  const handlePositionDelete = (): void => {
    deletePositionMutation({
      variables: { id: position.id }
    })
  }

  const handleModalClose = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={handleModalClose}>Update</MenuItem>
          <MenuItem onClick={handlePositionDelete}>Delete</MenuItem>
        </BasicMenu>
      )}
      {open && <PositionUpdateModal position={position} onClose={handleModalClose} />}
    </Box>
  )
}
