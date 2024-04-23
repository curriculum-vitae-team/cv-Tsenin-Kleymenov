import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useBooleanState } from '@/hooks/useBooleanState'
import { useUser } from '@/hooks/useUser'
import { PositionUpdateModal } from '@/pages/PositionsPage/PositionUpdateModal/PositionUpdateModal'

import { useDeletePosition } from '../hook/useDeletePosition'

import { IPositionDropdownProps } from './PositionDropdown.interfaces'

export const PositionDropdown: FC<IPositionDropdownProps> = ({ position }) => {
  const { isAdmin } = useUser()

  const { isVisible, toggleVisibility } = useBooleanState()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const { onSubmit, loading: loadingPosition } = useDeletePosition(position.id, toggleDelete)

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isAdmin && (
        <BasicMenu>
          <MenuItem onClick={toggleVisibility}>{t('update')}</MenuItem>
          <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>
        </BasicMenu>
      )}
      {isVisible && <PositionUpdateModal position={position} onClose={toggleVisibility} />}
      {isDelete && (
        <DeleteModal
          isLoading={loadingPosition}
          title={t('confirmRemovePosition')}
          message={t('confirmRemovePositionMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </Box>
  )
}
