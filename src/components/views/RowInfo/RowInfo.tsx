import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Typography } from '@mui/material'

import { IRowInfoProps } from './RowInfo.interfaces'

export const RowInfo: FC<IRowInfoProps> = ({ title, info }) => {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ display: 'flex', my: 1 }}>
        <Typography sx={{ fontSize: '24px' }}>{`${t(title)}:`}</Typography>
        <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
          {info || '-'}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}
