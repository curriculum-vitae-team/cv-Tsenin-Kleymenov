import { gql } from '@apollo/client'

export const PROJECT = gql`
  query GetProjectInfo($id: ID!) {
    project(projectId: $id) {
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
