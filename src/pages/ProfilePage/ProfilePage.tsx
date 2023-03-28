import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { ProfileTabs } from '@/components/containers/ProfileTabs/ProfileTabs'

const ProfilePage: FC = () => {
  const { id } = useParams<string>()

  return <ProfileTabs userId={id} />
}

export default ProfilePage
