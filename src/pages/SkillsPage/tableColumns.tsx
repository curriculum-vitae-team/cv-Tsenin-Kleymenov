import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'

export const tableColumns: IColumn<ISkill>[] = [
  {
    id: 1,
    header: 'Skill name',
    field: 'name',
    sortable: true
  }
]
