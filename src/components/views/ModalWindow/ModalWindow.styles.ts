import { DialogContent as MuiDialogContent, IconButton, styled, Typography } from '@mui/material'

export const DialogContent = styled(MuiDialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const CloseButton = styled(IconButton)(() => ({
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
