import { styled } from '@mui/material'

export const FormContainer = styled('div')(({ theme }) => ({
  maxWidth: '550px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: theme.palette.text.primary
}))
