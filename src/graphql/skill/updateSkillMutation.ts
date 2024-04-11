import { gql } from '@apollo/client'

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      created_at
      name
      category
    }
  }
`
