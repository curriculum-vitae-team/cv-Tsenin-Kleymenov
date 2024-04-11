import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      created_at
      email
      is_verified
      profile {
        id
        created_at
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
      cvs {
        id
        created_at
        name
        education
        description
        user {
          id
          email
        }
        projects {
          id
          name
          internal_name
          description
          domain
          start_date
          end_date
          team_size
          roles
          responsibilities
        }
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
        created_at
        name
      }
      department_name
      position {
        id
        created_at
        name
      }
      position_name
      role
    }
  }
`
