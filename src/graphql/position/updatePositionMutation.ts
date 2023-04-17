import { gql } from '@apollo/client'

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($id: ID!, $position: PositionInput!) {
    updatePosition(id: $id, position: $position) {
      id
      created_at
      name
    }
  }
`
