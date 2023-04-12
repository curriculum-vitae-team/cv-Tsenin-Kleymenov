import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  IconButton,
  styled
} from '@mui/material'

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export const DialogContent = styled(MuiDialogContent)(() => ({
  display: 'flex',
  flexDirection: 'column'
}))

export const CloseButton = styled(IconButton)(() => ({
  alignSelf: 'flex-end'
}))
