import { gql } from '@apollo/client'

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $department: DepartmentInput!) {
    updateDepartment(id: $id, department: $department) {
      id
      created_at
      name
    }
  }
`
