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

export const AppBreadcrumbs: FC<IAppBreadcrumbsProps> = ({ userId }) => {
  const { data: userData } = useQuery(USER, {
    variables: { id: userId }
  })
  const location = useLocation()
  const pathnameArray = location.pathname.split('/').filter(item => item)
  const profileLink = useMemo(
    () => `/${AppNavigationRoutes.EMPLOYEES}/${userId}/${AppNavigationRoutes.PROFILE}`,
    [userId]
  )

  return (
    <Breadcrumbs sx={{ my: 2 }} color="secondary" separator={<NavigateNextIcon />}>
      <BreadcrumbsLink to={AppNavigationRoutes.EMPLOYEES}>
        <HomeIcon sx={{ mr: 1 }} />
        Home
      </BreadcrumbsLink>
      {pathnameArray.map((item, index, arr) => {
        if (item === userId) {
          return (
            <BreadcrumbsLink to={profileLink} key={item}>
              <UserBreadcrumbText>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {userData?.user.profile.full_name || userData?.user.email}
              </UserBreadcrumbText>
            </BreadcrumbsLink>
          )
        }
        return (
          <BreadcrumbsLink
            to={
              index === arr.length - 1 ? location.pathname : AppNavigationRoutes[item.toUpperCase()]
            }
            key={item}
            color={index === arr.length - 1 ? 'info' : 'primary'}
          >
            {item.charAt(0).toUpperCase() + item.slice(1, item.length)}
          </BreadcrumbsLink>
        )
      })}
    </Breadcrumbs>
  )
}
