import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeProfileForm } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm'
import { Loader } from '@/components/views/Loader/Loader'
import { USER } from '@/graphql/user/userQuery'

export const ProfileEmployeePage: FC = () => {
  const { id } = useParams<string>()

  const { loading: loadingUser, data: userData } = useQuery<IUserResult>(USER, {
    variables: { id }
  })

  if (loadingUser) {
    return <Loader color="primary" />
  }

  return <EmployeeProfileForm currentUser={userData?.user} />
}
