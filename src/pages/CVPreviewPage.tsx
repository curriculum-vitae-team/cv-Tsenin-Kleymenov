import { FC, ReactInstance, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useQuery } from '@apollo/client'
import { Avatar, Box, Card, Chip, Divider, Typography } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { Button } from '@/components/views/Button/Button'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
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

  const { t } = useTranslation()

  const { profile, email, position_name, department_name } = CVData?.cv?.user ?? {}

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
        {t('print')}
      </Button>
      <Divider sx={{ my: 2 }} />
      <LoadingOverlay active={CVLoading}>
        <Box sx={{ p: 3 }} ref={componentRef}>
          <Box sx={{ display: 'flex' }}>
            <Box>
              {profile?.avatar ? (
                <Avatar src={profile?.avatar} sx={{ width: 200, height: 200 }} />
              ) : (
                <Avatar sx={{ width: 200, height: 200 }}>
                  <Typography variant="h3">{getFirstChars(profile?.full_name || email)}</Typography>
                </Avatar>
              )}
              <RowInfo title="name" info={profile?.full_name} />
              <RowInfo title="email" info={email} />
              <RowInfo title="position" info={position_name} />
              <RowInfo title="department" info={department_name} />
            </Box>
            <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
            <Box sx={{ alignSelf: 'flex-start' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ my: 1, fontSize: '24px' }}>{t('skills')}:</Typography>
                {CVData?.cv?.skills.length ? (
                  CVData?.cv.skills.map(skill => (
                    <Chip
                      sx={{ m: 0.5, fontWeight: '700' }}
                      color="primary"
                      variant="outlined"
                      key={skill.name}
                      label={skill.name}
                    />
                  ))
                ) : (
                  <Typography color="primary" sx={{ ml: 1, fontSize: '24px' }}>
                    -
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ my: 1, fontSize: '24px' }}>{t('languages')}:</Typography>
                {CVData?.cv?.languages.length ? (
                  CVData?.cv.languages.map(language => (
                    <Chip
                      sx={{ m: 0.5, fontWeight: '700' }}
                      color="primary"
                      variant="outlined"
                      key={language.name}
                      label={language.name}
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
            <Typography sx={{ mt: 3, fontSize: '1.5rem' }}>{t('projects')}</Typography>
            {CVData?.cv?.projects?.map(project => (
              <Card sx={{ my: 1, p: 2, display: 'flex' }} key={project.internal_name}>
                <Box>
                  <RowInfo title="projectName" info={project.name.toUpperCase()} />
                  <RowInfo title="startDate" info={project?.start_date} />
                  <RowInfo title="endDate" info={project?.end_date || 'Now'} />
                  <RowInfo title="domain" info={project?.domain} />
                </Box>
                <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
                <RowInfo title="description" info={project?.description} />
              </Card>
            ))}
          </>
        </Box>
      </LoadingOverlay>
    </Box>
  )
}
