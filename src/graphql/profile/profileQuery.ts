import { gql } from '@apollo/client'

export const PROFILE = gql`
  query User($id: ID!) {
    user(userId: $id) {
      id
      email
      profile {
        id
        full_name
        avatar
      }
    }
  }
`
