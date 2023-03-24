import { Avatar as MuiAvatar, styled } from '@mui/material'

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main
}))
