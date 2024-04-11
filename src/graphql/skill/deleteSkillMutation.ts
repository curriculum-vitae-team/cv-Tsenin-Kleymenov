import { gql } from '@apollo/client'

export const DELETE_SKILL = gql`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      affected
    }
  }
`
