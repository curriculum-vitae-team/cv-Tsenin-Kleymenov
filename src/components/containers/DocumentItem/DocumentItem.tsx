import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { DocumentItemTitle, DocumentSubTitle, Item } from './DocumentItem.styles'

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
      <DocumentSubTitle>{description ? description : children}</DocumentSubTitle>
    </Item>
  )
}
