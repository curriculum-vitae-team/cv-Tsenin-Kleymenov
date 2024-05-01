import { styled, TableCell, TableContainer } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: 'auto',
  height: '100%'
}))

export const StyledTableCell = styled(TableCell)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px'
}))

export const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderBottom: `1px solid ${theme.palette.grey[400]}`
}))
