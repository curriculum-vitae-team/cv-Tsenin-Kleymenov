import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
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
