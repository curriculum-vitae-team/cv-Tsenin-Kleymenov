import { gql } from '@apollo/client'

export const DEPARTMENTS = gql`
  query AllDepartments {
    departments {
      id
      created_at
      name
    }
  }
`
