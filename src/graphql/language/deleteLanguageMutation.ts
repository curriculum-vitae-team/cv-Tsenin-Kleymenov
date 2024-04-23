import { gql } from '@apollo/client'

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language) {
      affected
    }
  }
`
