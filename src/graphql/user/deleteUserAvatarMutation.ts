import { gql } from '@apollo/client'

export const DELETE_AVATAR = gql`
  mutation deleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`
