import { CV } from '@/graphql/cv/CVQuery'
import { PROJECT } from '@/graphql/project/projectQuery'
import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { IBreadcrumbsQuery } from './Breadcrumbs.interfaces'

export const BreadcrumbsQuery: IBreadcrumbsQuery = {
  [AppNavigationRoutes.EMPLOYEES]: USER,
  [AppNavigationRoutes.PROJECTS]: PROJECT,
  [AppNavigationRoutes.CVS]: CV
}
