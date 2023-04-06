import { FC } from 'react'
import { MenuItem } from '@mui/material'

import { BasicMenu } from '../BasicMenu/BasicMenu'

export const CVsDropdown: FC = () => {
  return (
    <BasicMenu>
      <MenuItem>CV</MenuItem>
      <MenuItem>Delete CV</MenuItem>
    </BasicMenu>
  )
}
