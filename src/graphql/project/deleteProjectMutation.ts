import { gql } from '@apollo/client'

export const DELETE_PROJECT = gql`
  mutation DeleteProject($project: DeleteProjectInput!) {
    deleteProject(project: $project) {
      affected
    }
  }
`
