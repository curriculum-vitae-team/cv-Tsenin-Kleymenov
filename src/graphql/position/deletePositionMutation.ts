import { gql } from '@apollo/client'

export const DELETE_POSITION = gql`
  mutation DeletePosition($position: DeletePositionInput!) {
    deletePosition(position: $position) {
      affected
    }
  }
`
