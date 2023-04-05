import { gql } from '@apollo/client'

export const UPDATE_CV = gql`
  mutation UpdateCV($id: ID!, $cv: CvInput!) {
    updateCv(id: $id, cv: $cv) {
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
