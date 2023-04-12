import { Checkbox } from '@mui/material'

import { CVsDropdown } from '@/components/containers/CVsDropdown/CVsDropdown'
import { ProjectsNames } from '@/components/views/ProjectsNames/ProjectsNames'
import { IColumn } from '@/constants/tablesData/Column.interfaces'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'

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
    render: CV => <CVsDropdown CVId={CV.id} />,
    sortable: false
  }
]
