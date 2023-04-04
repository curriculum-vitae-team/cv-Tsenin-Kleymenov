import { styled, TableRow } from '@mui/material'

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9'
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
