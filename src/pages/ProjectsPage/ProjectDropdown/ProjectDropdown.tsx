import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import { DELETE_PROJECT } from '@/graphql/project/deleteProjectMutation'
import { GET_PROJECTS } from '@/graphql/projects/projectsQuery'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { IProjectDropdownProps } from './ProjectDropdown.interfaces'

export const ProjectDropdown: FC<IProjectDropdownProps> = ({ project }) => {
  const navigate = useNavigate()

  const [_, isAdmin] = useUser()

  const [deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  const { t } = useTranslation()

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
      <MenuItem onClick={handleOpenProject}>{t('Details')}</MenuItem>
      {isAdmin && <MenuItem onClick={handleProjectDelete}>{t('Delete')}</MenuItem>}
    </BasicMenu>
  )
}
