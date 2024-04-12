import { FC } from 'react'
import { Box } from '@mui/material'

import { RowInfo } from '@/components/views/RowInfo/RowInfo'

import { IProjectDetailItemProps } from './ProjectDetailItem.interfaces'

export const ProjectDetailItem: FC<IProjectDetailItemProps> = ({ project }) => {
  return (
    <Box>
      <RowInfo title="name" info={project?.name} />
      <RowInfo title="internalName" info={project?.internal_name} />
      <RowInfo title="description" info={project?.description} />
      <RowInfo title="domain" info={project?.domain} />
      <RowInfo title="teamSize" info={project?.team_size} />
      <RowInfo title="startDate" info={project?.start_date} />
      <RowInfo title="endDate" info={project?.end_date} />
    </Box>
  )
}
