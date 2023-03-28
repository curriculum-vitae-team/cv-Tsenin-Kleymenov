import { gql } from '@apollo/client'

export const POSITIONS = gql`
  query AllPositions {
    positions {
      id
      created_at
      name
    }
  }
`
