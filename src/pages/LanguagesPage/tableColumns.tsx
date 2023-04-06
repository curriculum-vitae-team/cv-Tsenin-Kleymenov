import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'

export const tableColumns: IColumn<ILanguage>[] = [
  {
    id: 1,
    header: 'Language',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'ISO2',
    field: 'iso2',
    sortable: true
  }
]
