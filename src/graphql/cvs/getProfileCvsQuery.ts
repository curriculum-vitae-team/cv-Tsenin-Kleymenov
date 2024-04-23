import { gql } from '@apollo/client'

export const GET_PROFILE_CVS = gql`
  query User($id: ID!) {
    user(userId: $id) {
      id
      cvs {
        id
        name
        description
      }
    }
  }
`
