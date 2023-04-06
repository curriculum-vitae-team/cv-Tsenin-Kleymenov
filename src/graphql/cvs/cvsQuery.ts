import { gql } from '@apollo/client'

export const GET_CVS = gql`
  query GetCVs {
    cvs {
      id
      created_at
      name
      description
      user {
        email
      }
      projects {
        id
        name
        internal_name
        description
        domain
        start_date
        end_date
        team_size
        tech_stack {
          id
          created_at
          name
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
      is_template
    }
  }
`
