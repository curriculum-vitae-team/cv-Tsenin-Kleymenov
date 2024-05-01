import { IconButton as MuiIconButton, styled } from '@mui/material'

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}))
