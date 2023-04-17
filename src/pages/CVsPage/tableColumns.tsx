import { Checkbox } from '@mui/material'

import { IColumn } from '@/appTypes/Column.interfaces'
import { ProjectsNames } from '@/components/views/ProjectsNames/ProjectsNames'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'
import { CVDropdown } from '@/pages/CVsPage/CVDropdown/CVDropdown'

export const tableColumns: IColumn<ICV>[] = [
  {
    id: 1,
    header: 'Template',
    render: item => <Checkbox checked={item.is_template} size="small" />,
    sortable: false
  },
  {
    id: 2,
    header: 'Name',
    field: 'name',
    sortable: true
  },
  {
    id: 3,
    header: 'Description',
    field: 'description',
    sortable: false
  },
  {
    id: 4,
    header: 'Employee',
    field: 'user.email',
    sortable: true
  },
  {
    id: 5,
    header: 'Projects',
    render: item => <ProjectsNames item={item} />,
    sortable: false
  },
  {
    id: 6,
    header: '',
    render: CV => <CVDropdown CV={CV} />,
    sortable: false
  }
]
