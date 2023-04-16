import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'

import { IButtonProps } from './Button.interfaces'

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  const { t } = useTranslation()

  return (
    <LoadingButton sx={{ my: 2, p: 1 }} fullWidth {...props}>
      <Typography>{t(children as string)}</Typography>
    </LoadingButton>
  )
}
