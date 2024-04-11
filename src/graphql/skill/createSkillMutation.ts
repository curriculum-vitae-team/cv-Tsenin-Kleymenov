import { gql } from '@apollo/client'

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      created_at
      name
      category
    }
  }
`
