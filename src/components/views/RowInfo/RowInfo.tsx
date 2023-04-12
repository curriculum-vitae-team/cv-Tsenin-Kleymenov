import React, { FC } from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { IRowInfoProps } from './RowInfo.interfaces'

export const RowInfo: FC<IRowInfoProps> = ({ title, info }) => {
  return (
    <>
      <Box sx={{ display: 'flex', my: 1 }}>
        <Typography sx={{ fontSize: '24px' }}>{`${title}:`}</Typography>
        <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
          {info || '-'}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}
