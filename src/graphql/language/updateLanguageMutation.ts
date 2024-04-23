import { gql } from '@apollo/client'

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      iso2
      name
      native_name
      created_at
    }
  }
`
