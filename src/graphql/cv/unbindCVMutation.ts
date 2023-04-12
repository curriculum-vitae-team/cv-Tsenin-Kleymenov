import { gql } from '@apollo/client'

export const UNBIND_CV = gql`
  mutation UnbindCV($id: ID!) {
    unbindCv(id: $id) {
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
