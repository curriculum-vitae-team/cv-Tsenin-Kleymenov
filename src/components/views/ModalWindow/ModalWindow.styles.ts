import { Dialog as MuiDialog, IconButton, styled } from '@mui/material'

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export const CloseButton = styled(IconButton)(() => ({
  alignSelf: 'flex-end'
}))
