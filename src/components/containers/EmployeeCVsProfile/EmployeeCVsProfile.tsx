import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { IUserResult } from '@/appTypes/IResult.interfaces'
import { CommonTable } from '@/components/views/CommonTable/CommonTable'
import { GET_PROFILE_CVS } from '@/graphql/cvs/getProfileCvsQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { ICV } from '@/graphql/interfaces/ICv.interfaces'

import { tableColumns } from './tableColumns'

export const EmployeeCVsProfile: FC = () => {
  const { id: userId } = useParams()

  const { data, loading, error } = useQuery<IUserResult>(GET_PROFILE_CVS, {
    variables: { id: userId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  return (
    <CommonTable<ICV>
      label="cvs"
      data={data?.user.cvs}
      tableColumns={tableColumns}
      isLoading={loading}
      error={error}
    />
  )
}
