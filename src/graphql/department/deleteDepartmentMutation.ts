import { gql } from '@apollo/client'

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department) {
      affected
    }
  }
`
