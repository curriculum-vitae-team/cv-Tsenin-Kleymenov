import { Container, styled } from '@mui/material'

import { Button } from '@/components/views/Button/Button'

export const Document = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '32px!important',

  '@media print': {
    margin: 0,
    padding: 0,
    background: '#fff',
    color: theme.palette.secondary.main,
    printColorAdjust: 'exact'
  }
}))

export const ExportButton = styled(Button)(() => ({
  maxWidth: 210,
  alignSelf: 'flex-end',
  gridArea: '1 / 2',

  '@media print': {
    display: 'none'
  }
}))
