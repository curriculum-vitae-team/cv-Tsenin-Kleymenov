import { gql } from '@apollo/client'

export const USER = gql`
  query User($id: ID!) {
    user(userId: $id) {
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
          project {
            id
            created_at
            name
            internal_name
            description
            domain
            start_date
            end_date
            team_size
            tech_stack {
              id
              created_at
              name
              category
            }
          }
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
