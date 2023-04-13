import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ISkill } from '@/graphql/interfaces/ISkill.interfaces'

export interface ISkillUpdateModalProps extends IBaseModalProps {
  skill?: ISkill
}
