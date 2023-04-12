import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { AppNavigationRoutes } from '@/router/paths'

import { IProjectsDropdownProps } from './ProjectsDropdown.interfaces'

export const ProjectsDropdown: FC<IProjectsDropdownProps> = ({ projectId }) => {
  const navigate = useNavigate()

  const handleOpenProject = (): void => {
    navigate(`${projectId}`, { state: AppNavigationRoutes.PROJECTS })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenProject}>Project</MenuItem>
      <MenuItem>Delete project</MenuItem>
    </BasicMenu>
  )
}
