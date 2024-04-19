import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Typography } from '@mui/material'

import { ICVResult } from '@/appTypes/IResult.interfaces'
import { DocumentItem } from '@/components/containers/DocumentItem/DocumentItem'
import { LoadingOverlay } from '@/components/views/LoadingOverlay/LoadingOverlay'
import { CV } from '@/graphql/cv/CVQuery'
import { EXPORT_PDF } from '@/graphql/exportPdf/exportPdfMutation'
import { FETCH_POLICY } from '@/graphql/fetchPolicy'
import { downloadPdf } from '@/utils/downloadPdf'
import { groupedSkills } from '@/utils/groupData'
import { prepareHtml } from '@/utils/prepareHtml'

import { Container, Document, ExportButton } from './CVPreviewPage.styles'

export const CVPreviewPage: FC = () => {
  const { id: CVId } = useParams()

  const componentRef = useRef<HTMLDivElement | null>(null)

  const { data: CVData, loading: CVLoading } = useQuery<ICVResult>(CV, {
    variables: { id: CVId },
    fetchPolicy: FETCH_POLICY.networkOnly
  })

  const [exportPDF, { loading: loadingPDF }] = useMutation(EXPORT_PDF)

  const { t } = useTranslation()

  const { profile, position_name } = CVData?.cv?.user ?? {}

  const handleExportPDF = async (): Promise<void> => {
    const response = await exportPDF({
      variables: {
        pdf: {
          html: prepareHtml(componentRef.current as HTMLElement),
          margin: {
            top: '15mm',
            bottom: '15mm',
            left: '15mm',
            right: '15mm'
          }
        }
      }
    })

    if (response.data) {
      downloadPdf({ name: CVData?.cv.name ?? 'CV', base64: response.data.exportPdf })
    }
  }

  const group = groupedSkills(CVData?.cv.skills ?? [])

  return (
    <Document ref={componentRef}>
      <LoadingOverlay active={CVLoading}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">{profile?.full_name}</Typography>
            <Typography sx={{ textTransform: 'uppercase' }}>{position_name}</Typography>
          </div>
          <ExportButton variant="contained" loading={loadingPDF} onClick={handleExportPDF}>
            {t('exportToPdf')}
          </ExportButton>
        </Container>
        <Box sx={{ display: 'flex', paddingBottom: '30px' }}>
          <Box sx={{ paddingRight: '32px', mWidth: '240px' }}>
            <DocumentItem title={'education' ?? ''} description={CVData?.cv.education} />
            <DocumentItem title={'languageProficiency' ?? ''}>
              {CVData?.cv.languages.map(lang => (
                <span
                  key={lang.name}
                  style={{ display: 'block' }}
                >{`${lang.name} - ${lang.proficiency}`}</span>
              ))}
            </DocumentItem>
          </Box>
          <Box sx={{ borderLeft: '2px solid #c63031', paddingLeft: '32px' }}>
            <DocumentItem title={CVData?.cv.name ?? ''} description={CVData?.cv.description} />
            {Object.entries(group).map(([category, skills], index) => (
              <DocumentItem key={`${category}-${index}`} title={category}>
                {skills.map((skill, index) => (
                  <span key={`${skill}-${index}`}>
                    {skill.name}
                    {index !== skills.length - 1 && ', '}
                  </span>
                ))}
              </DocumentItem>
            ))}
          </Box>
        </Box>
      </LoadingOverlay>
    </Document>
  )
}
