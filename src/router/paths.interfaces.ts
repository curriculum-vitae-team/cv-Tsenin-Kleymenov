import { ReactElement } from 'react'

export interface IPath {
  [key: string]: string
}

export interface IRoute {
  path: string
  element: ReactElement
}
