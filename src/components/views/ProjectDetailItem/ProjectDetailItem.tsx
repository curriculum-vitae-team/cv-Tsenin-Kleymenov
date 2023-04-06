import React, { FC } from 'react'
import { Card, CardContent } from '@mui/material'

import { IProject } from '@/graphql/interfaces/IProject.interfaces'

import { RowInfo } from './RowInfo/RowInfo'

export interface IProjectDetailItemProps {
  project: IProject
}

export const ProjectDetailItem: FC<IProjectDetailItemProps> = ({ project }) => {
  return (
    <Card>
      <CardContent>
        <RowInfo title="Name" info={project?.name} />
        <RowInfo title="Internal name" info={project?.internal_name} />
        <RowInfo title="Description" info={project?.description} />
        <RowInfo title="Domain" info={project?.domain} />
        <RowInfo title="Start date" info={project?.start_date} />
        <RowInfo title="End date" info={project?.end_date} />
      </CardContent>
    </Card>
  )
}
