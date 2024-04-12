import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Chip, Divider, Typography } from '@mui/material'

import { RowInfo } from '@/components/views/RowInfo/RowInfo'

import { ICVDetailItemProps } from './CVDetailItem.interfaces'

export const CVDetailItem: FC<ICVDetailItemProps> = ({ CVData }) => {
  const { t } = useTranslation()

  return (
    <>
      <RowInfo title="name" info={CVData?.name} />
      <RowInfo title="description" info={CVData?.description} />
      <RowInfo title="user" info={CVData?.user?.profile?.full_name} />
      <RowInfo title="userPosition" info={CVData?.user?.position_name} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography sx={{ my: 1, fontSize: '24px' }}>{t('skills')}:</Typography>
        {CVData?.skills.length ? (
          CVData?.skills.map(skill => (
            <Chip
              sx={{ m: 0.5, fontWeight: '700' }}
              color="primary"
              variant="outlined"
              key={skill.name}
              label={skill.name}
            />
          ))
        ) : (
          <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
            -
          </Typography>
        )}
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography sx={{ my: 1, fontSize: '24px' }}>{t('languages')}:</Typography>
        {CVData?.languages.length ? (
          CVData?.languages.map(language => (
            <Chip
              sx={{ m: 0.5, fontWeight: '700' }}
              color="primary"
              variant="outlined"
              key={language.name}
              label={language.name}
            />
          ))
        ) : (
          <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
            -
          </Typography>
        )}
      </Box>
      <Divider />
    </>
  )
}
