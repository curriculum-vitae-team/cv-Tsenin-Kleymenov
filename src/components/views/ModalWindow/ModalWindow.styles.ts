import { DialogContent as MuiDialogContent, IconButton, styled } from '@mui/material'

export const DialogContent = styled(MuiDialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const CloseButton = styled(IconButton)(() => ({
  margin: '-8px'
}))

export const ModalTitle = styled('h2')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '500px'
}))

export const ModalHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))
