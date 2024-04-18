import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

import { DocumentItemTitle, Item } from './DocumentItem.styles'

interface IDocumentItemProps {
  key?: string
  title: string
  description?: string
  children?: ReactNode
}

export const DocumentItem: FC<IDocumentItemProps> = ({ title, description, children }) => {
  const { t } = useTranslation()

  return (
    <Item>
      <DocumentItemTitle>{t(title) ?? title}</DocumentItemTitle>
      <Typography>{description ? description : children}</Typography>
    </Item>
  )
}
