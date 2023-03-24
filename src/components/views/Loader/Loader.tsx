import { FC } from 'react'
import { CircularProgressProps } from '@mui/material'

import { AppLoader } from './Loader.styles'

export const Loader: FC<CircularProgressProps> = props => {
  return <AppLoader {...props} />
}
