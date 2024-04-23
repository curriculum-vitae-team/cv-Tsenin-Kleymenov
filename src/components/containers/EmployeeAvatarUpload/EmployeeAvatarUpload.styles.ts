import { Avatar, Box, Paper, styled } from '@mui/material'

export const DropZone = styled(Paper)({
  '&:hover': {
    cursor: 'pointer'
  }
})

export const AvatarWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  position: 'relative'
})

export const EmployeeAvatar = styled(Avatar)(() => ({
  width: 200,
  height: 200
}))
