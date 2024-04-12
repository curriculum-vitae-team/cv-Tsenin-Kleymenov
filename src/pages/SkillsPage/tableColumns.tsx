import { IColumn } from '@/appTypes/Column.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'

import { SkillDropdown } from './SkillDropdown/SkillDropdown'

export const tableColumns: IColumn<ISkill>[] = [
  {
    id: 1,
    header: 'skillName',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'category',
    field: 'category',
    sortable: true
  },
  {
    id: 3,
    header: '',
    render: item => <SkillDropdown skill={item} />,
    sortable: false
  }
]
