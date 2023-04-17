import { gql } from '@apollo/client'

export const DELETE_POSITION = gql`
  mutation DeletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`
