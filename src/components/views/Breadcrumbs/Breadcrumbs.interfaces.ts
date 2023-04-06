import { DocumentNode } from '@apollo/client'

export interface IAppBreadcrumbsProps {
  id?: string
}

export interface IBreadcrumbsQuery {
  [key: string]: DocumentNode
}
