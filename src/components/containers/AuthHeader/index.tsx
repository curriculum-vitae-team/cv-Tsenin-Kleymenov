import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { AppNavigationRoutes } from '../../../constants/paths'

export const AuthHeader: FC = () => {
  return (
    <ul>
      <li>
        <NavLink to={AppNavigationRoutes.SignIn}>Login</NavLink>
      </li>
      <li>
        <NavLink to={AppNavigationRoutes.SignUp}>SignUp</NavLink>
      </li>
    </ul>
  )
}
