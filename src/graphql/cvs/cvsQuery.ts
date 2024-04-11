import { gql } from '@apollo/client'

export const GET_CVS = gql`
  query GetCVs {
    cvs {
      id
      name
      description
      user {
        id
        email
      }
    }
  }
`
