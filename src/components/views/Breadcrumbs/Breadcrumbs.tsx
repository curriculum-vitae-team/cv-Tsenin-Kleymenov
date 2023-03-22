import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'

import { SIDE_MENU_ITEMS } from '@/constants/sideMenuItems'

import { BreadcrumbsLink, StartCrumb } from './Breadcrumbs.styles'

export const AppBreadcrumbs: FC = () => {
  const location = useLocation()
  const { id } = useParams()

  return (
    <Breadcrumbs color="primary" separator={<NavigateNextIcon />}>
      <StartCrumb>
        <HomeIcon /> Home
      </StartCrumb>
      {Object.values(SIDE_MENU_ITEMS)
        .filter(item => {
          return id ? item.route + id : item.route === location.pathname
        })
        .map(item => {
          const { text, route, icon: Icon } = item
          return (
            <BreadcrumbsLink to={route} key={text}>
              <Icon />
              {text}
            </BreadcrumbsLink>
          )
        })}
    </Breadcrumbs>
  )
}
