import { styled } from '@mui/material'

export const ApplicationContainer = styled('div')(() => ({
  width: '100%',
  height: '100vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column'
}))

export const ApplicationWrapper = styled('div')(() => ({
  flex: 1
}))

export const ApplicationContent = styled('div')(() => ({
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  width: '100%'
}))
