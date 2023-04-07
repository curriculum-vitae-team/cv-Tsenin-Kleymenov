import React, { FC } from 'react'
import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material'

import { RowInfo } from '../RowInfo/RowInfo'

import { ICVDetailItemProps } from './CVDetailItem.interfaces'

export const CVDetailItem: FC<ICVDetailItemProps> = ({ cv }) => {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <RowInfo title="Name" info={cv?.name} />
        <RowInfo title="Description" info={cv?.description} />
        <RowInfo title="User" info={cv?.user?.profile?.full_name} />
        <RowInfo title="User position" info={cv?.user?.position_name} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ my: 1, fontSize: '24px' }}>Skills:</Typography>
          <Box></Box>
          {cv?.skills.length > 0 ? (
            cv?.skills.map(skill => (
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
          {cv?.languages.length > 0 ? (
            cv?.languages.map(language => (
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
      </CardContent>
    </Card>
  )
}
