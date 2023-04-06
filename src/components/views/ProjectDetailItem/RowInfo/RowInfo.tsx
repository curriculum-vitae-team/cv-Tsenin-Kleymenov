import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'

export interface IRowInfoProps {
  title: string
  info?: string
}

export const RowInfo: FC<IRowInfoProps> = ({ title, info }) => {
  return (
    <Box sx={{ display: 'flex', my: 1 }}>
      <Typography sx={{ fontSize: '24px' }}>{`${title}:`}</Typography>
      <Typography sx={{ ml: 1, fontSize: '24px' }}>{info || '-'}</Typography>
    </Box>
  )
}
