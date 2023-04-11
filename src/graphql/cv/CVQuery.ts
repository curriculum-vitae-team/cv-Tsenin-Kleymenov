import { gql } from '@apollo/client'

export const CV = gql`
  query Cv($id: ID!) {
    cv(id: $id) {
      id
      created_at
      name
      description
      user {
        id
        email
        position_name
        department_name
        profile {
          first_name
          last_name
          full_name
          avatar
        }
      }
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      }
      projects {
        id
        name
        internal_name
        domain
        start_date
        end_date
        description
      }
      is_template
    }
  }
`
