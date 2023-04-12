import React, { FC } from 'react'
import { Box, Chip, Divider, Typography } from '@mui/material'

import { RowInfo } from '@/components/views/RowInfo/RowInfo'

import { ICVDetailItemProps } from './CVDetailItem.interfaces'

export const CVDetailItem: FC<ICVDetailItemProps> = ({ CVData }) => {
  return (
    <>
      <RowInfo title="Name" info={CVData?.name} />
      <RowInfo title="Description" info={CVData?.description} />
      <RowInfo title="User" info={CVData?.user?.profile?.full_name} />
      <RowInfo title="User position" info={CVData?.user?.position_name} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography sx={{ my: 1, fontSize: '24px' }}>Skills:</Typography>
        {CVData?.skills.length ? (
          CVData?.skills.map(skill => (
            <Chip
              sx={{ m: 0.5, fontWeight: '700' }}
              color="primary"
              variant="outlined"
              key={skill.skill_name}
              label={skill.skill_name}
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
        <Typography sx={{ my: 1, fontSize: '24px' }}>Languages:</Typography>
        {CVData?.languages.length ? (
          CVData?.languages.map(language => (
            <Chip
              sx={{ m: 0.5, fontWeight: '700' }}
              color="primary"
              variant="outlined"
              key={language.language_name}
              label={language.language_name}
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
