import { IUser } from '@/graphql/interfaces/IUser.interfaces'

export interface IUserAvatarProps {
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void
  user?: IUser
}
