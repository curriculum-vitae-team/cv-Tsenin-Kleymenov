import { gql } from '@apollo/client'

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        category
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`
