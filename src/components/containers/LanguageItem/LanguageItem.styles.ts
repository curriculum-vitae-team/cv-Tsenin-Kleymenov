import { Card, IconButton, styled } from '@mui/material'

export const LanguageItemContainer = styled(Card)(({ theme }) => ({
  margin: '5px',
  padding: '15px',
  maxWidth: '300px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between'
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'flex-start',
  backgroundColor: theme.palette.primary.main,
  color: 'white'
}))
