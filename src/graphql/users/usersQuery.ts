import { gql } from '@apollo/client'

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
      role
    }
  }
`
