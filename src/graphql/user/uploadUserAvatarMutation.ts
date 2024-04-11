import { gql } from '@apollo/client'

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`
