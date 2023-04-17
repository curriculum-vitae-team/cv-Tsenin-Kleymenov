import { FC } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  const { data } = useQuery(BreadcrumbsQuery[location.state] || USER, {
    variables: { id }
  })

  const pathnameArray = location.pathname.split('/').filter(item => item)
  const profileLink = `/${AppNavigationRoutes.EMPLOYEES}/${id}/${AppNavigationRoutes.PROFILE}`
  const cvLink = `/${AppNavigationRoutes.CVS}/${id}/${AppNavigationRoutes.DETAILS}`

  return (
    <Breadcrumbs sx={{ my: 2 }} color="secondary" separator={<NavigateNextIcon />}>
      <BreadcrumbsLink to={AppNavigationRoutes.EMPLOYEES}>
        <HomeIcon sx={{ mr: 1 }} />
        {t('Home')}
      </BreadcrumbsLink>
      {pathnameArray.map((item, index, arr) => {
        if (item === id && index !== arr.length - 1) {
          return (
            <BreadcrumbsLink
              key={item}
              to={data?.user ? profileLink : cvLink}
              state={data?.user ? AppNavigationRoutes.EMPLOYEES : AppNavigationRoutes.CVS}
            >
              <UserBreadcrumbText>
                {data?.user && (
                  <>
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {data?.user?.profile.full_name || data?.user?.email}
                  </>
                )}
                {data?.cv && data?.cv?.name}
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
              : t(item.charAt(0).toUpperCase() + item.slice(1, item.length))}
          </BreadcrumbsLink>
        )
      })}
    </Breadcrumbs>
  )
}
