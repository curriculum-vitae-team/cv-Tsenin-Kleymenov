import { FC } from 'react'
import { Box } from '@mui/material'

import { RowInfo } from '@/components/views/RowInfo/RowInfo'

import { IProjectDetailItemProps } from './ProjectDetailItem.interfaces'

export const ProjectDetailItem: FC<IProjectDetailItemProps> = ({ project }) => {
  return (
    <Box>
      <RowInfo title="Name" info={project?.name} />
      <RowInfo title="Internal name" info={project?.internal_name} />
      <RowInfo title="Description" info={project?.description} />
      <RowInfo title="Domain" info={project?.domain} />
      <RowInfo title="Start date" info={project?.start_date} />
      <RowInfo title="End date" info={project?.end_date} />
    </Box>
  )
}
