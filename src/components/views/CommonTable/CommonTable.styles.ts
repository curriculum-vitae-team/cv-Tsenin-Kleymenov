import { styled, TableContainer, TableRow } from '@mui/material'

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9'
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: 'auto',
  height: '100%'
}))
