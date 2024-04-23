import { gql } from '@apollo/client'

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
      created_at
      name
    }
  }
`
