import { gql } from '@apollo/client'

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      id
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
