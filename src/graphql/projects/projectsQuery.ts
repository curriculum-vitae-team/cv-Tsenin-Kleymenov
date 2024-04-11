import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
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
  }
`
