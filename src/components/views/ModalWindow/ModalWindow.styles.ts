import { Dialog as MuiDialog, styled } from '@mui/material'

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
