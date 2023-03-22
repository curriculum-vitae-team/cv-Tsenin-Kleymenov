import { Box, Paper, styled } from '@/mui/material'

export const DropZone = styled(Paper)({
  '&:hover': {
    cursor: 'pointer'
  }
})

export const AvatarWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start'
})
