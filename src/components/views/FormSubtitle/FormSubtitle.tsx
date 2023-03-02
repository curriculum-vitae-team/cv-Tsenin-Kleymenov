import { Typography } from '@mui/material'

export const FormSubtitle = ({ children }: { children: string }): JSX.Element => {
  return (
    <Typography variant="h6" component="h2">
      {children}
    </Typography>
  )
}
