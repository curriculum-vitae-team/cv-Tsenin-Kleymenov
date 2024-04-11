import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      created_at
      email
      is_verified
      profile {
        id
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          category
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      department {
        id
        name
      }
      department_name
      position {
        id
        name
      }
      position_name
    }
  }
`
