import { FC, ReactInstance, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useQuery } from '@apollo/client'
import { Avatar, Box, Card, Chip, Divider, Typography } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { Loader } from '@/components/views/Loader/Loader'
import { RowInfo } from '@/components/views/RowInfo/RowInfo'
import { CV } from '@/graphql/cv/CVQuery'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { getFirstChars } from '@/utils/getFirstChar'

export const CVPreviewPage: FC = () => {
  const { id: CVId } = useParams()
  const componentRef = useRef<ReactInstance | null>(null)

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const handlePrintClick = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        sx={{ maxWidth: 210, alignSelf: 'flex-end' }}
        variant="contained"
        onClick={handlePrintClick}
      >
        Print
      </Button>
      <Divider sx={{ my: 2 }} />
      {CVLoading ? (
        <Loader color="primary" />
      ) : (
        <Box sx={{ p: 3 }} ref={componentRef} id="pdf">
          <Box sx={{ display: 'flex' }}>
            <Box>
              {CVData?.cv.user?.profile?.avatar ? (
                <Avatar src={CVData?.cv.user?.profile?.avatar} sx={{ width: 200, height: 200 }} />
              ) : (
                <Avatar sx={{ width: 200, height: 200 }}>
                  <Typography variant="h3">
                    {getFirstChars(CVData?.cv.user?.profile?.full_name || CVData?.cv.user?.email)}
                  </Typography>
                </Avatar>
              )}
              <RowInfo title="Name" info={CVData?.cv.user?.profile?.full_name} />
              <RowInfo title="Email" info={CVData?.cv.user?.email} />
              <RowInfo title="Position" info={CVData?.cv.user?.position_name} />
              <RowInfo title="Department" info={CVData?.cv.user?.department_name} />
            </Box>
            <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
            <Box sx={{ alignSelf: 'flex-start' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ my: 1, fontSize: '24px' }}>Skills:</Typography>
                {CVData?.cv?.skills ? (
                  CVData?.cv.skills.map(skill => (
                    <Chip
                      sx={{ m: 0.5, fontWeight: '700' }}
                      color="primary"
                      variant="outlined"
                      key={skill.skill_name}
                      label={skill.skill_name}
                    />
                  ))
                ) : (
                  <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
                    -
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ my: 1, fontSize: '24px' }}>Languages:</Typography>
                {CVData?.cv?.languages ? (
                  CVData?.cv.languages.map(language => (
                    <Chip
                      sx={{ m: 0.5, fontWeight: '700' }}
                      color="primary"
                      variant="outlined"
                      key={language.language_name}
                      label={language.language_name}
                    />
                  ))
                ) : (
                  <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
                    -
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mx: 2 }} orientation="horizontal" flexItem />
          <>
            <Typography sx={{ mt: 3, fontSize: '1.5rem' }}>Projects</Typography>
            {CVData?.cv?.projects?.map(project => (
              <Card sx={{ my: 1, p: 2, display: 'flex' }} key={project.internal_name}>
                <Box>
                  <RowInfo title="Project name" info={project.name.toUpperCase()} />
                  <RowInfo title="Start date" info={project?.start_date} />
                  <RowInfo title="End date" info={project?.end_date || 'Now'} />
                  <RowInfo title="Domain" info={project?.domain} />
                </Box>
                <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
                <RowInfo title="Description" info={project?.description} />
              </Card>
            ))}
          </>
        </Box>
      )}
    </Box>
  )
}
