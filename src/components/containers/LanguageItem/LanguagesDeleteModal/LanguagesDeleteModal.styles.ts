import { styled } from '@mui/material'

import { Button } from '@/components/views/Button/Button'

export const ModalGroupButtons = styled('div')(() => ({
  display: 'flex',
  gap: '20px',
  width: 'max-content',
  marginTop: '30px',
  marginLeft: 'auto'
}))

export const ModalAction = styled(Button)(() => ({
  width: '100%',
  padding: '8px 20px',
  margin: 0
}))
