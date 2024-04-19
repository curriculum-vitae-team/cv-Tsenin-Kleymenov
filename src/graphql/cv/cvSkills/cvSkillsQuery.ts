import { gql } from '@apollo/client'

export const CV_SKILLS = gql`
  query CvSkills($id: ID!) {
    cv(cvId: $id) {
      id
      user {
        id
      }
      skills {
        name
        category
        mastery
      }
    }
  }
`
