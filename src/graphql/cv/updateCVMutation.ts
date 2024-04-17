import { gql } from '@apollo/client'

export const UPDATE_CV = gql`
  mutation UpdateCV($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      created_at
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`
