import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import get from 'lodash.get'

import { Loader } from '../Loader/Loader'

import { ICommonTableProps } from './CommonTable.interfaces'
import { StyledTableRow } from './CommonTable.styles'

export const CommonTable = <T extends { id: string }>({
  label,
  data,
  tableColumns,
  isLoading,
  error
}: ICommonTableProps<T>): JSX.Element => {
  return isLoading ? (
    <Loader />
  ) : (
    <TableContainer>
      <Table aria-label={`${label.toLowerCase()} table`}>
        <TableHead>
          <TableRow>
            {tableColumns.map(column => (
              <TableCell key={column.id}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                style={{ color: 'red', textAlign: 'center' }}
              >
                {error.message}
              </TableCell>
            </TableRow>
          ) : (
            data?.map(item => (
              <StyledTableRow key={item.id}>
                {tableColumns.map(column => {
                  return (
                    <TableCell key={column.id}>
                      {column.render
                        ? column.render(item)
                        : column.field &&
                          typeof get(item, column.field) !== 'object' &&
                          get(item, column.field)}
                    </TableCell>
                  )
                })}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
