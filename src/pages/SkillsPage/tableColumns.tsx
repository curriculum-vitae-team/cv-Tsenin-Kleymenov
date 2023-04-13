import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'

import { SkillDropdown } from './SkillDropdown/SkillDropdown'

export const tableColumns: IColumn<ISkill>[] = [
  {
    id: 1,
    header: 'Skill name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: '',
    render: item => <SkillDropdown skill={item} />,
    sortable: false
  }
]
