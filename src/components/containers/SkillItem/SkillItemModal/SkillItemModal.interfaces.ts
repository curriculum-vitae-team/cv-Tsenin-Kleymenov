import { IBaseModalProps } from '@/appTypes/IBaseModalProps.interfaces'
import { ISkillMastery } from '@/graphql/interfaces/ISkillMastery.interfaces'

export interface ISkillItemModalProps extends IBaseModalProps {
  userData?: {
    id: string
    skills: ISkillMastery[]
  }
  skillInfo: {
    skill?: ISkillMastery
    setSkillInfo: (skill: ISkillMastery) => void
  }
}
