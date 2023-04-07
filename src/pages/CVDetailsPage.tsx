import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Box } from '@mui/material'

import { CVDetailItem } from '@/components/views/CVDetailItem/CVDetailItem'
import { Loader } from '@/components/views/Loader/Loader'
import { CV } from '@/graphql/cv/CVQuery'

export const CVDetailsPage: FC = () => {
  const { id: CVId } = useParams()
  const { data: CVData, loading: CVLoading } = useQuery(CV, {
    variables: { id: CVId }
  })

  return (
    <Box>
      {CVLoading ? (
        <Loader color="primary" />
      ) : (
        <CVDetailItem cv={CVData?.cv} />
      )}
    </Box>
  )
}
