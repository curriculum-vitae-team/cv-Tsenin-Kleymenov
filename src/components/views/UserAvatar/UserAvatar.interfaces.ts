import { AvatarProps } from '@mui/material'

import { IProfileResult } from '@/appTypes/IResult.interfaces'

export interface IUserAvatarProps extends AvatarProps {
  profile?: IProfileResult['user']['profile']
}
