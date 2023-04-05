import { Avatar as MuiAvatar, styled } from '@mui/material'

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  margin: '0 16px',
  backgroundColor: theme.palette.primary.main
}))
