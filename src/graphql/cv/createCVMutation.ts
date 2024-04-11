import { gql } from '@apollo/client'

export const CREATE_CV = gql`
  mutation CreateCV($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      created_at
      name
      description
      education
      user {
        id
        email
      }
    }
  }
`
