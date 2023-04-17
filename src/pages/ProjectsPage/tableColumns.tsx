import { IColumn } from '@/appTypes/Column.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { ProjectDropdown } from '@/pages/ProjectsPage/ProjectDropdown/ProjectDropdown'

export const tableColumns: IColumn<IProject>[] = [
  {
    id: 1,
    header: 'Name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'Internal name',
    field: 'internal_name',
    sortable: true
  },
  {
    id: 3,
    header: 'Domain',
    field: 'domain',
    sortable: true
  },
  {
    id: 4,
    header: 'Start date',
    field: 'start_date',
    sortable: true
  },
  {
    id: 5,
    header: 'End date',
    field: 'end_date',
    render: item => <>{!item.end_date ? 'Till now' : item.end_date}</>,
    sortable: true
  },
  {
    id: 6,
    header: 'Team size',
    field: 'team_size',
    sortable: true
  },
  {
    id: 7,
    header: '',
    render: project => <ProjectDropdown project={project} />,
    sortable: false
  }
]
