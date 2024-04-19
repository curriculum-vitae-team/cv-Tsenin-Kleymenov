import { ICVSkillsResult } from '@/appTypes/IResult.interfaces'

export interface ICVSkillsModalProps extends ICVSkillsResult {
  onClose: () => void
}
