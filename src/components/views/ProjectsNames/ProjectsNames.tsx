import { FC } from 'react'
import { Chip } from '@mui/material'

import { IProjectsNames } from './ProjectsNames.interfaces'

export const ProjectsNames: FC<IProjectsNames> = ({ item }) => {
  return (
    <>
      {item.projects.map(({ id, name }) => {
        return (
          <Chip
            style={{ marginBottom: '6px', marginRight: '6px' }}
            key={id}
            variant="outlined"
            label={name}
            size="small"
          />
        )
      })}
    </>
  )
}
