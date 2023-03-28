import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'

import { USER } from '@/graphql/user/userQuery'
import { AppNavigationRoutes } from '@/router/paths'
import { getUserProfilePath } from '@/utils/getUserProfilePath'

import { BreadcrumbsLink, UserBreadcrumbText } from './Breadcrumbs.styles'

export const AppBreadcrumbs: FC = () => {
  const location = useLocation()
  const splitedPath = location.pathname.split('/')
  const pathnameArray = splitedPath.filter(item => item)
  const userId = splitedPath.filter(item => +item)[0]

  const { data: userData } = useQuery(USER, {
    variables: { id: userId }
  })

  return (
    <Breadcrumbs sx={{ my: 2 }} color="secondary" separator={<NavigateNextIcon />}>
      <BreadcrumbsLink to={AppNavigationRoutes.EMPLOYEES}>
        <HomeIcon sx={{ mr: 1 }} />
        Home
      </BreadcrumbsLink>
      {pathnameArray.map((item, index, arr) => {
        if (item === userId) {
          return (
            <BreadcrumbsLink
              to={getUserProfilePath(AppNavigationRoutes.PROFILE, userData?.user)}
              key={item}
            >
              <UserBreadcrumbText>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {userData?.user.profile.full_name || userData?.user.email}
              </UserBreadcrumbText>
            </BreadcrumbsLink>
          )
        }
        return (
          <BreadcrumbsLink
            to={getUserProfilePath(AppNavigationRoutes[item.toUpperCase()], userData?.user)}
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
