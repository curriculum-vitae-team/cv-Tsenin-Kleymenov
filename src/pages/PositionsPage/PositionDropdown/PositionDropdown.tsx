import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { DELETE_POSITION } from '@/graphql/position/deletePositionMutation'
import { POSITIONS } from '@/graphql/positions/positionsQuery'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { PositionUpdateModal } from '@/pages/PositionsPage/PositionUpdateModal/PositionUpdateModal'

import { IPositionDropdownProps } from './PositionDropdown.interfaces'

export const PositionDropdown: FC<IPositionDropdownProps> = ({ position }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const [deletePositionMutation] = useMutation(DELETE_POSITION, {
    refetchQueries: [{ query: POSITIONS }]
  })

  const { t } = useTranslation()

  const handlePositionDelete = (): void => {
    deletePositionMutation({
      variables: { id: position.id }
    })
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
