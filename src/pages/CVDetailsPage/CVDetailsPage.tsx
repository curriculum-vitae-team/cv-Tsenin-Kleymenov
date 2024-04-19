import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { CV } from '@/graphql/cv/CVQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  return (
    <LoadingOverlay active={CVLoading}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CVDetailItem CVData={CVData?.cv} />
      </Box>
    </LoadingOverlay>
  )
}
