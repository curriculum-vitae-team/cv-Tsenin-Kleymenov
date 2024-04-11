import { IColumn } from '@/appTypes/Column.interfaces'
import { ILanguage } from '@/graphql/interfaces/ILanguage.interfaces'

import { LanguageDropdown } from './LanguageDropdown/LanguageDropdown'

export const tableColumns: IColumn<ILanguage>[] = [
  {
    id: 1,
    header: 'Language',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'Native name',
    field: 'native_name',
    sortable: false
  },
  {
    id: 3,
    header: 'ISO2',
    field: 'iso2',
    sortable: true
  },
  {
    id: 4,
    header: '',
    render: item => <LanguageDropdown language={item} />,
    sortable: false
  }
]
