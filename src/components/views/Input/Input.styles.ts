import { InputAdornment as MuiInputAdornment, styled } from '@mui/material'

export const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
  color: theme.palette.info.main
}))
