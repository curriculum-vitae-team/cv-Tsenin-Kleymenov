import { styled } from '@mui/material'
import { CircularProgress } from '@mui/material'

export const AppLoader = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: 3,
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'transparent'
}))
