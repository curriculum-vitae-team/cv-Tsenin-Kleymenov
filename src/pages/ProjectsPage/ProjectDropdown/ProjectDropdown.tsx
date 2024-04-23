import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '@/components/containers/BasicMenu/BasicMenu'
import DeleteModal from '@/components/views/DeleteModal/DeleteModal'
import { useDeleteModal } from '@/components/views/DeleteModal/hook/useDeleteModal'
import { useUser } from '@/hooks/useUser'
import { AppNavigationRoutes } from '@/router/paths'

import { useDeleteProject } from '../hook/useDeleteProject'

import { IProjectDropdownProps } from './ProjectDropdown.interfaces'

export const ProjectDropdown: FC<IProjectDropdownProps> = ({ project }) => {
  const navigate = useNavigate()

  const { isAdmin } = useUser()

  const { t } = useTranslation()

  const { isDelete, toggleDelete } = useDeleteModal()

  const handleOpenProject = (): void => {
    navigate(`${project?.id}`, { state: AppNavigationRoutes.PROJECTS })
  }

  const { onSubmit, loading: loadingProject } = useDeleteProject(project.id, toggleDelete)

  return (
    <>
      <BasicMenu>
        <MenuItem onClick={handleOpenProject}>{t('details')}</MenuItem>
        {isAdmin && <MenuItem onClick={toggleDelete}>{t('delete')}</MenuItem>}
      </BasicMenu>
      {isDelete && (
        <DeleteModal
          isLoading={loadingProject}
          title={t('confirmRemoveProject')}
          message={t('confirmRemoveProjectMessage')}
          onSubmit={onSubmit}
          onClose={toggleDelete}
        />
      )}
    </>
  )
}
