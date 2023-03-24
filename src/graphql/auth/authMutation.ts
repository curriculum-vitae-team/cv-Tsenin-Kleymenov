import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
      access_token
    }
  }
`
