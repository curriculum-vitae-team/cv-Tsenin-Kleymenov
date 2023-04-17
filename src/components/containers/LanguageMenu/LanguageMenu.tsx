import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language'
import { IconButton, Menu, MenuItem } from '@mui/material'

import { LANGUAGES } from '@/constants/languages'

import { LanguageMenuWrapper } from './LanguageMenu.styles'

export const LanguageMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { i18n } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)
  }

  return (
    <LanguageMenuWrapper>
      <IconButton aria-label="more" color="primary" onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
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
        <MenuItem onClick={() => changeLanguage(LANGUAGES.EN)}>EN</MenuItem>
        <MenuItem onClick={() => changeLanguage(LANGUAGES.RU)}>RU</MenuItem>
      </Menu>
    </LanguageMenuWrapper>
  )
}
