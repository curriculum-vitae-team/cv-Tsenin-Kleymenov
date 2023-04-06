import { FC, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'

import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'

import { IAppBreadcrumbsProps } from './Breadcrumbs.interfaces'
import { BreadcrumbsLink, UserBreadcrumbText } from './Breadcrumbs.styles'
import { BreadcrumbsQuery } from './queries'

export const AppBreadcrumbs: FC<IAppBreadcrumbsProps> = ({ id }) => {
  const location = useLocation()

  const { data } = useQuery(BreadcrumbsQuery[location.state] || USER, {
    variables: { id }
  })

  const pathnameArray = location.pathname.split('/').filter(item => item)
  const profileLink = useMemo(
    () => `/${AppNavigationRoutes.EMPLOYEES}/${id}/${AppNavigationRoutes.PROFILE}`,
    [id]
  )

  return (
    <Breadcrumbs sx={{ my: 2 }} color="secondary" separator={<NavigateNextIcon />}>
      <BreadcrumbsLink to={AppNavigationRoutes.EMPLOYEES}>
        <HomeIcon sx={{ mr: 1 }} />
        Home
      </BreadcrumbsLink>
      {pathnameArray.map((item, index, arr) => {
        if (item === id && index !== arr.length - 1) {
          return (
            <BreadcrumbsLink key={item} to={profileLink}>
              <UserBreadcrumbText>
                {data?.user && <AccountCircleIcon sx={{ mr: 1 }} />}
                {data?.user.profile.full_name || data?.user.email || data?.Cv.name}
              </UserBreadcrumbText>
            </BreadcrumbsLink>
          )
        }
        return (
          <BreadcrumbsLink
            key={item}
            to={AppNavigationRoutes[item.toUpperCase()]}
            style={{ pointerEvents: index === arr.length - 1 ? 'none' : 'auto' }}
            color={index === arr.length - 1 ? 'info' : 'primary'}
          >
            {item === id && index === arr.length - 1
              ? data?.project.name
              : item.charAt(0).toUpperCase() + item.slice(1, item.length)}
          </BreadcrumbsLink>
        )
      })}
    </Breadcrumbs>
  )
}
