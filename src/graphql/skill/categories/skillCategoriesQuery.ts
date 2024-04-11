import { gql } from '@apollo/client'

export const SKILL_CATEGORIES = gql`
  query getSkillCategories {
    skillCategories
  }
`
