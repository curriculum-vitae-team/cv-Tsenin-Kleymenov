import { gql } from '@apollo/client'

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $skill: SkillInput!) {
    updateSkill(id: $id, skill: $skill) {
      id
      created_at
      name
    }
  }
`
