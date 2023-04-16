import { Children, FC, useState } from 'react'
import LanguageIcon from '@mui/icons-material/Language'
import { IconButton, Menu } from '@mui/material'

import { ILanguageMenuProps } from './LanguageMenu.interfaces'
import { MenuWrapper } from './LanguageMenu.styles'

export const LanguageMenu: FC<ILanguageMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <MenuWrapper>
      <IconButton aria-label="more" color="primary" onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {children && Children.map(children, child => <div onClick={handleClose}>{child}</div>)}
      </Menu>
    </MenuWrapper>
  )
}
