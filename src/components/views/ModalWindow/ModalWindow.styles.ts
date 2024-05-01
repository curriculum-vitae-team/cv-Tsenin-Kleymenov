import { DialogContent as MuiDialogContent, styled, Typography } from '@mui/material'

import { CloseButton as MuiCloseButton } from '@/components/views/CloseButton/CloseButton'

export const DialogContent = styled(MuiDialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const CloseButton = styled(MuiCloseButton)(() => ({
  margin: '-8px'
}))

export const ModalTitle = styled(Typography)(() => ({
  fontWeight: 'bold'
}))

export const ModalHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
}))
