import { gql } from '@apollo/client'

export const CV = gql`
  query Cv($id: ID!) {
    cv(cvId: $id) {
      id
      created_at
      name
      education
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
      projects {
        id
        project {
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
            name
            category
          }
        }
        name
        internal_name
        description
        domain
        start_date
        end_date
        team_size
        roles
        responsibilities
      }
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
