import { Typography } from '@mui/material'

export const FormTitle = ({ children }: { children: string }): JSX.Element => {
  return (
    <Typography sx={{ my: 1 }} variant="h3" component="h1">
      {children}
    </Typography>
  )
}
