import { IColumn } from '@/appTypes/Column.interfaces'
import { IProject } from '@/graphql/interfaces/IProject.interfaces'
import { ProjectDropdown } from '@/pages/ProjectsPage/ProjectDropdown/ProjectDropdown'

export const tableColumns: IColumn<IProject>[] = [
  {
    id: 1,
    header: 'name',
    field: 'name',
    sortable: true
  },
  {
    id: 2,
    header: 'internalName',
    field: 'internal_name',
    sortable: true
  },
  {
    id: 3,
    header: 'domain',
    field: 'domain',
    sortable: true
  },
  {
    id: 4,
    header: 'startDate',
    field: 'start_date',
    sortable: true
  },
  {
    id: 5,
    header: 'endDate',
    field: 'end_date',
    render: item => <>{!item.end_date ? 'Till now' : item.end_date}</>,
    sortable: true
  },
  {
    id: 6,
    header: 'teamSize',
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
