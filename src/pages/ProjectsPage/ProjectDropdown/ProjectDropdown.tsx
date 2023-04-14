import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useReactiveVar } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { ROLE } from '@/constants/userRoles'
import { authService } from '@/graphql/auth/authService'
import { DELETE_PROJECT } from '@/graphql/project/deleteProjectMutation'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { IProjectDropdownProps } from './ProjectDropdown.interfaces'

export const ProjectDropdown: FC<IProjectDropdownProps> = ({ project }) => {
  const navigate = useNavigate()
  const user = useReactiveVar(authService.user$)
  const isAdmin = user?.role === ROLE.admin

  const [deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  const handleOpenProject = (): void => {
    navigate(`${project?.id}`, { state: AppNavigationRoutes.PROJECTS })
  }

  const handleProjectDelete = (): void => {
    deleteProjectMutation({
      variables: { id: project.id }
    })
  }

  return (
    <BasicMenu>
      <MenuItem onClick={handleOpenProject}>Details</MenuItem>
      {isAdmin && <MenuItem onClick={handleProjectDelete}>Delete</MenuItem>}
    </BasicMenu>
  )
}
