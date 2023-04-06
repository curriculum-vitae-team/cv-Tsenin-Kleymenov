import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { AppNavigationRoutes } from '@/router/paths'

import { BasicMenu } from '../BasicMenu/BasicMenu'

export interface IProjectsDropdownProps {
  projectId: string
}

export const ProjectsDropdown: FC<IProjectsDropdownProps> = ({ projectId }) => {
  return (
    <BasicMenu>
      <MenuItem>
        <Link
          to={`${projectId}`}
          state={AppNavigationRoutes.PROJECTS}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Project
        </Link>
      </MenuItem>
      <MenuItem>Delete project</MenuItem>
    </BasicMenu>
  )
}
