import { gql } from '@apollo/client'

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      created_at
      name
    }
  }
`
