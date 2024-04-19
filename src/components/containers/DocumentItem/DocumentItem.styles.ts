import { styled, Typography } from '@mui/material'

export const DocumentItemTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  marginBottom: '12px'
}))

export const Item = styled('div')(() => ({
  marginBottom: '16px'
}))

export const DocumentSubTitle = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}))
