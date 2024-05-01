import { styled } from '@mui/material'

export const Content = styled('div')(() => ({
  height: '100%',
  overflow: 'auto',
  width: '100%',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column'
}))

export const ContentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '100%',
  overflow: 'auto',
  position: 'relative'
}))
