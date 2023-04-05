import { FC } from 'react'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '../BasicMenu/BasicMenu'

export const ProjectsDropdown: FC = () => {
  return (
    <BasicMenu>
      <MenuItem>Projects</MenuItem>
      <MenuItem>Delete project</MenuItem>
    </BasicMenu>
  )
}
