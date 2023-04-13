import { gql } from '@apollo/client'

export const CREATE_CV = gql`
  mutation CreateCV($cv: CvInput!) {
    createCv(cv: $cv) {
      id
      created_at
      name
      description
      user {
        id
        email
      }
      is_template
    }
  }
`
