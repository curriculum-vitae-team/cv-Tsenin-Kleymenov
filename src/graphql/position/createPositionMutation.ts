import { gql } from '@apollo/client'

export const CREATE_POSITION = gql`
  mutation CreatePosition($position: CreatePositionInput!) {
    createPosition(position: $position) {
      id
      created_at
      name
    }
  }
`
