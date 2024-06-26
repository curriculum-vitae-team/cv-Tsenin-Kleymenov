import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material'
import get from 'lodash/get'

import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'

import { ICommonTableProps } from './CommonTable.interfaces'
import { StyledTableCell, StyledTableContainer, StyledTableHeaderCell } from './CommonTable.styles'

const Table = <T extends { id: string }>({
  label,
  data,
  tableColumns,
  isLoading,
  error
}: ICommonTableProps<T>): JSX.Element => {
  const [orderBy, setOrderBy] = useState<string | null>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { t } = useTranslation()

  const handleSortColumnClick = (path: string): void => {
    if (path === orderBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(path)
      setSortOrder('asc')
    }
  }

  const sortedData = data?.slice().sort((a, b) => {
    if (!orderBy) return 0

    const valueA = get(a, orderBy) as string
    const valueB = get(b, orderBy) as string

    if (valueA === valueB) return 0

    if (!valueA) return 1

    if (!valueB) return -1

    if (sortOrder === 'asc') return valueA < valueB ? -1 : 1
    else return valueA > valueB ? -1 : 1
  })

  return (
    <LoadingOverlay active={isLoading}>
      <StyledTableContainer>
        <MuiTable stickyHeader aria-label={`${label.toLowerCase()} table`}>
          <TableHead>
            <TableRow>
              {tableColumns.map(column => (
                <StyledTableHeaderCell key={column.id} sx={{ fontWeight: '700' }}>
                  {!column.sortable ? (
                    t(column.header as string)
                  ) : (
                    <TableSortLabel
                      active={column.field === orderBy}
                      direction={column.field === orderBy ? sortOrder : 'asc'}
                      onClick={() => handleSortColumnClick(column.field as string)}
                    >
                      {t(column.header as string)}
                    </TableSortLabel>
                  )}
                </StyledTableHeaderCell>
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
              sortedData?.map(item => (
                <TableRow key={item.id}>
                  {tableColumns.map(column => {
                    return (
                      <StyledTableCell key={column.id}>
                        {column.render
                          ? column.render(item)
                          : column.field &&
                            typeof get(item, column.field) !== 'object' &&
                            get(item, column.field)}
                      </StyledTableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </StyledTableContainer>
    </LoadingOverlay>
  )
}

export const CommonTable = memo(Table) as typeof Table
