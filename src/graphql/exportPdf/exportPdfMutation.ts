import { gql } from '@apollo/client'

export const EXPORT_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`
