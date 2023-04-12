import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { EmployeeProfileForm } from '@/components/containers/EmployeeProfileForm/EmployeeProfileForm'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { USER } from '@/graphql/user/userQuery'

export const ProfileEmployeePage: FC = () => {
  const { id } = useParams<string>()

  const { loading: loadingUser, data: userData } = useQuery<IUserResult>(USER, {
    variables: { id }
  })

  return (
    <LoadingOverlay active={loadingUser}>
      <EmployeeProfileForm currentUser={userData?.user} />
    </LoadingOverlay>
  )
}
